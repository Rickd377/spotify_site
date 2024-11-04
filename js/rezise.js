document.addEventListener('DOMContentLoaded', function() {
  const leftSide = document.querySelector('.left-side');
  const rightSide = document.querySelector('.right-side');
  const leftResizeHandle = leftSide.querySelector('.resize-handle');
  const rightResizeHandle = rightSide.querySelector('.right-resize-handle');
  const playlistList = document.querySelector('.left-playlist-list');
  const sortBtns = document.querySelector('.sort-btns');
  const rightTopNavigation = document.querySelector('.right-top-navigation');
  const scrollSection = document.querySelector('.scroll-section');

  playlistList.addEventListener('scroll', function() {
    if (playlistList.scrollTop > 0) {
      sortBtns.classList.add('scrolled');
    } else {
      sortBtns.classList.remove('scrolled');
    }
  });

  scrollSection.addEventListener('scroll', function() {
    if (scrollSection.scrollTop > 0) {
      rightTopNavigation.classList.add('scrolled');
    } else {
      rightTopNavigation.classList.remove('scrolled');
    }
  });

  let rightSideScaled = false;
  let rightSideWidth = 420;

  function resizeLeftSide(e) {
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = parseInt(document.defaultView.getComputedStyle(leftSide).width, 10);

    leftResizeHandle.style.cursor = 'grabbing';
    document.documentElement.style.cursor = 'grabbing';

    function doDrag(e) {
      const newWidth = startWidth + e.clientX - startX;
      if (newWidth >= 420 && newWidth <= 1180) {
        leftSide.style.width = newWidth + 'px';
        if (newWidth > 1100) {
          rightSideWidth = Math.max(280, 420 - (newWidth - 1100));
          rightSide.style.width = rightSideWidth + 'px';
          rightSideScaled = true;
        } else if (!rightSideScaled) {
          rightSide.style.width = '420px';
        }
      }
    }

    function stopDrag() {
      document.documentElement.removeEventListener('mousemove', doDrag, false);
      document.documentElement.removeEventListener('mouseup', stopDrag, false);
      leftResizeHandle.style.cursor = 'grab';
      document.documentElement.style.cursor = 'default';
    }

    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
  }

  leftResizeHandle.addEventListener('mousedown', resizeLeftSide, false);

  function resizeRightSide(e) {
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = parseInt(document.defaultView.getComputedStyle(rightSide).width, 10);

    rightResizeHandle.style.cursor = 'grabbing';
    document.documentElement.style.cursor = 'grabbing';

    function doDrag(e) {
      const newWidth = startWidth - (e.clientX - startX);
      if (newWidth >= 280 && newWidth <= 420) {
        rightSideWidth = newWidth;
        rightSide.style.width = rightSideWidth + 'px';
        rightSideScaled = true;
      }
    }

    function stopDrag() {
      document.documentElement.removeEventListener('mousemove', doDrag, false);
      document.documentElement.removeEventListener('mouseup', stopDrag, false);
      rightResizeHandle.style.cursor = 'grab';
      document.documentElement.style.cursor = 'default';
    }

    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
  }

  rightResizeHandle.addEventListener('mousedown', resizeRightSide, false);
});
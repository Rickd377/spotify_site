document.addEventListener('DOMContentLoaded', function() {
  const leftSide = document.querySelector('.left-side');
  const resizeHandle = leftSide.querySelector('.resize-handle');
  const playlistList = document.querySelector('.left-playlist-list');
  const sortBtns = document.querySelector('.sort-btns');

  playlistList.addEventListener('scroll', function() {
    if (playlistList.scrollTop > 0) {
      sortBtns.classList.add('scrolled');
    } else {
      sortBtns.classList.remove('scrolled');
    }
  });

  resizeHandle.addEventListener('mousedown', function(e) {
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = parseInt(document.defaultView.getComputedStyle(leftSide).width, 10);

    function doDrag(e) {
      const newWidth = startWidth + e.clientX - startX;
      if (newWidth >= 420 && newWidth <= 1480) {
        leftSide.style.width = newWidth + 'px';
      }
    }

    function stopDrag() {
      document.documentElement.removeEventListener('mousemove', doDrag, false);
      document.documentElement.removeEventListener('mouseup', stopDrag, false);
    }

    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
  }, false);
});
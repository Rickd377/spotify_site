const input = document.querySelector('.search-input');
const folderIcon = document.querySelector('.fa-album-collection');

input.addEventListener('input', () => {
  if (input.value.trim() !== '') {
    folderIcon.classList.remove('fa-album-collection');
    folderIcon.classList.add('fa-xmark');
    folderIcon.setAttribute('data-title', 'Clear search field');
  } else {
    folderIcon.classList.remove('fa-xmark');
    folderIcon.classList.add('fa-album-collection');
    folderIcon.setAttribute('data-title', 'Browse');
  }
});

folderIcon.addEventListener('mousedown', (event) => {
  if (folderIcon.classList.contains('fa-xmark')) {
    input.value = '';
    event.preventDefault();
    input.focus();
    setTimeout(() => {
      folderIcon.classList.remove('fa-xmark');
      folderIcon.classList.add('fa-album-collection');
      folderIcon.setAttribute('data-title', 'Browse');
    }, 150);
  }
});

folderIcon.addEventListener('click', () => {
  if (!folderIcon.classList.contains('fa-xmark')) {
    if (folderIcon.classList.contains('fa-light')) {
      folderIcon.classList.remove('fa-light');
      folderIcon.classList.add('fa-solid');
    } else {
      folderIcon.classList.remove('fa-solid');
      folderIcon.classList.add('fa-light');
    }
  }
});

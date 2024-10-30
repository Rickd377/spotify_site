const input = document.querySelector('.search-input');
const folderIcon = document.querySelector('.fa-folder-magnifying-glass');

input.addEventListener('input', () => {
  if (input.value.trim() !== '') {
    folderIcon.classList.remove('fa-folder-magnifying-glass');
    folderIcon.classList.add('fa-xmark');
    folderIcon.setAttribute('title', 'Clear search field');
  } else {
    folderIcon.classList.remove('fa-xmark');
    folderIcon.classList.add('fa-folder-magnifying-glass');
    folderIcon.setAttribute('title', 'Browse');
  }
});

folderIcon.addEventListener('mousedown', (event) => {
  if (folderIcon.classList.contains('fa-xmark')) {
    input.value = '';
    event.preventDefault();
    input.focus();
    folderIcon.classList.remove('fa-xmark');
    folderIcon.classList.add('fa-folder-magnifying-glass');
    folderIcon.setAttribute('title', 'Browse');
  }
});

folderIcon.addEventListener('click', () => {
  if (folderIcon.classList.contains('fa-light')) {
    folderIcon.classList.remove('fa-light');
    folderIcon.classList.add('fa-solid');
  } else {
    folderIcon.classList.remove('fa-solid');
    folderIcon.classList.add('fa-light');
  }
});

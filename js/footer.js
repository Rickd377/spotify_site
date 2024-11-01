document.addEventListener('DOMContentLoaded', function() {
  // Main progress bar
  const progress = document.querySelector('.progress-container progress');
  const progressDot = document.querySelector('.progress-dot');
  let isDragging = false;

  function updateProgressDot() {
    const value = progress.value;
    const max = progress.max;
    const percentage = (value / max) * 100;
    progressDot.style.left = `calc(${percentage}% - 6px)`;
  }

  function setProgressValue(event) {
    const progressContainer = progress.parentElement;
    const rect = progressContainer.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;
    const value = (percentage / 100) * progress.max;
    progress.value = Math.min(Math.max(value, 0), progress.max);
    updateProgressDot();
  }

  progress.addEventListener('click', function(event) {
    setProgressValue(event);
  });

  progressDot.addEventListener('mousedown', function(event) {
    isDragging = true;
    setProgressValue(event);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(event) {
    if (isDragging) {
      setProgressValue(event);
    }
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  progress.addEventListener('input', updateProgressDot);
  updateProgressDot();

  // Volume progress bar
  const volumeProgress = document.querySelector('.volume-container progress');
  const volumeProgressDot = document.querySelector('.volume-container .progress-dot');
  const volumeIcon = document.querySelector('.fa-volume');
  let isVolumeDragging = false;

  function updateVolumeProgressDot() {
    const value = volumeProgress.value;
    const max = volumeProgress.max;
    const percentage = (value / max) * 100;
    volumeProgressDot.style.left = `calc(${percentage}% - 6px)`;
    updateVolumeIcon(value);
  }

  function setVolumeProgressValue(event) {
    const progressContainer = volumeProgress.parentElement;
    const rect = progressContainer.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;
    const value = (percentage / 100) * volumeProgress.max;
    volumeProgress.value = Math.min(Math.max(value, 0), volumeProgress.max);
    updateVolumeProgressDot();
  }

  function updateVolumeIcon(value) {
    if (value === 0) {
      volumeIcon.className = 'fa-light fa-volume-xmark';
    } else if (value <= 50) {
      volumeIcon.className = 'fa-light fa-volume-low';
    } else if (value <= 100) {
      volumeIcon.className = 'fa-light fa-volume-high';
    }
  }

  volumeProgress.addEventListener('click', function(event) {
    setVolumeProgressValue(event);
  });

  volumeProgressDot.addEventListener('mousedown', function(event) {
    isVolumeDragging = true;
    setVolumeProgressValue(event);
    document.addEventListener('mousemove', onVolumeMouseMove);
    document.addEventListener('mouseup', onVolumeMouseUp);
  });

  function onVolumeMouseMove(event) {
    if (isVolumeDragging) {
      setVolumeProgressValue(event);
    }
  }

  function onVolumeMouseUp() {
    isVolumeDragging = false;
    document.removeEventListener('mousemove', onVolumeMouseMove);
    document.removeEventListener('mouseup', onVolumeMouseUp);
  }

  volumeProgress.addEventListener('input', updateVolumeProgressDot);
  updateVolumeProgressDot();

  // Volume icon click event
  volumeIcon.addEventListener('click', function() {
    if (volumeProgress.value > 0) {
      volumeProgress.value = 0;
      volumeIcon.className = 'fa-light fa-volume-xmark';
    } else {
      volumeProgress.value = 50; // Set to a default value, you can adjust as needed
      updateVolumeIcon(volumeProgress.value);
    }
    updateVolumeProgressDot();
  });

  // Shuffle and Repeat icons
  const shuffleIcon = document.querySelector('.fa-shuffle');
  const shuffleDot = document.querySelector('.shuffle-dot');
  const repeatIcon = document.querySelector('.fa-arrows-repeat');
  const repeatDot = document.querySelector('.repeat-dot');
  let repeatState = 0; // Track the state of the repeat icon
  
  shuffleIcon.addEventListener('click', function() {
    const isGreen = shuffleIcon.style.color === 'rgb(29, 185, 84)';
    shuffleDot.style.display = isGreen ? 'none' : 'block';
    shuffleIcon.style.color = isGreen ? 'rgb(179, 179, 179)' : 'rgb(29, 185, 84)';
    shuffleIcon.setAttribute('data-title', isGreen ? 'Enable shuffle' : 'Disable shuffle');
  });
  
  repeatIcon.addEventListener('click', function() {
    if (repeatState === 0) {
      // First click: turn icon green, show repeat-dot, keep fa-arrows-repeat
      repeatIcon.style.color = 'rgb(29, 185, 84)';
      repeatDot.style.display = 'block';
      repeatIcon.setAttribute('data-title', 'Enable repeat one');
      repeatState = 1;
    } else if (repeatState === 1) {
      // Second click: change icon to fa-arrows-repeat-1, keep color green, repeat-dot stays
      repeatIcon.classList.remove('fa-arrows-repeat');
      repeatIcon.classList.add('fa-arrows-repeat-1');
      repeatIcon.setAttribute('data-title', 'Disable repeat');
      repeatState = 2;
    } else {
      // Third click: revert to default (gray color, fa-arrows-repeat, hide repeat-dot)
      repeatIcon.style.color = 'rgb(179, 179, 179)';
      repeatIcon.classList.remove('fa-arrows-repeat-1');
      repeatIcon.classList.add('fa-arrows-repeat');
      repeatDot.style.display = 'none';
      repeatIcon.setAttribute('data-title', 'Enable repeat');
      repeatState = 0;
    }
  });

  // Play/Pause icon
  const playIcon = document.querySelector('.fa-circle-play');

  playIcon.addEventListener('click', function() {
    if (playIcon.classList.contains('fa-circle-play')) {
      playIcon.classList.remove('fa-circle-play');
      playIcon.classList.add('fa-circle-pause');
      playIcon.setAttribute('data-title', 'Pause');
    } else {
      playIcon.classList.remove('fa-circle-pause');
      playIcon.classList.add('fa-circle-play');
      playIcon.setAttribute('data-title', 'Play');
    }
  });
});
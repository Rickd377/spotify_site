document.addEventListener("DOMContentLoaded", function () {
  const progress = document.querySelector(".progress-container progress");
  const progressDot = document.querySelector(".progress-dot");
  const progressContainer = document.querySelector(".progress-container");
  let isDragging = false;

  function updateProgressDot() {
    const value = progress.value;
    const max = progress.max;
    const percentage = (value / max) * 100;
    progressDot.style.left = `calc(${percentage}% - 6px)`;
  }

  function setProgressValue(event) {
    const rect = progressContainer.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;
    const value = (percentage / 100) * progress.max;
    progress.value = Math.min(Math.max(value, 0), progress.max);
    updateProgressDot();
  }

  progress.addEventListener("mousedown", function (event) {
    isDragging = true;
    progressContainer.classList.add("dragging");
    setProgressValue(event);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  progressDot.addEventListener("mousedown", function (event) {
    isDragging = true;
    progressContainer.classList.add("dragging");
    event.stopPropagation();
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  function onMouseMove(event) {
    if (isDragging) {
      setProgressValue(event);
    }
  }

  function onMouseUp() {
    isDragging = false;
    progressContainer.classList.remove("dragging");
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  progress.addEventListener("input", updateProgressDot);
  updateProgressDot();

  const volumeProgress = document.querySelector(".volume-container progress");
  const volumeProgressDot = document.querySelector(
    ".volume-container .progress-dot"
  );

  const volumeContainer = document.querySelector(".volume-container");
  const volumeIcon = document.querySelector(".fa-volume");
  let isVolumeDragging = false;

  function updateVolumeIcon(value) {
    if (value === 0) {
      volumeIcon.className = "fa-light fa-volume-xmark";
    } else if (value <= 50) {
      volumeIcon.className = "fa-light fa-volume-low";
    } else {
      volumeIcon.className = "fa-light fa-volume-high";
    }
  }

  function updateVolumeProgressDot() {
    const value = volumeProgress.value;
    const max = volumeProgress.max;
    const percentage = (value / max) * 100;
    volumeProgressDot.style.left = `calc(${percentage}% - 6px)`;
    updateVolumeIcon(value);
  }

  function setVolumeProgressValue(event) {
    const rect = volumeContainer.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;
    const value = (percentage / 100) * volumeProgress.max;
    volumeProgress.value = Math.min(Math.max(value, 0), volumeProgress.max);
    updateVolumeProgressDot();
  }

  volumeProgress.addEventListener("mousedown", function (event) {
    isVolumeDragging = true;
    volumeContainer.classList.add("dragging");
    setVolumeProgressValue(event);
    document.addEventListener("mousemove", onVolumeMouseMove);
    document.addEventListener("mouseup", onVolumeMouseUp);
  });

  volumeProgressDot.addEventListener("mousedown", function (event) {
    isVolumeDragging = true;
    volumeContainer.classList.add("dragging");
    event.stopPropagation();
    document.addEventListener("mousemove", onVolumeMouseMove);
    document.addEventListener("mouseup", onVolumeMouseUp);
  });

  function onVolumeMouseMove(event) {
    if (isVolumeDragging) {
      setVolumeProgressValue(event);
    }
  }

  function onVolumeMouseUp() {
    isVolumeDragging = false;
    volumeContainer.classList.remove("dragging");
    document.removeEventListener("mousemove", onVolumeMouseMove);
    document.removeEventListener("mouseup", onVolumeMouseUp);
  }
  volumeProgress.addEventListener("input", updateVolumeProgressDot);
  updateVolumeProgressDot();
  volumeIcon.addEventListener("click", function () {
    if (volumeProgress.value > 0) {
      volumeProgress.value = 0;
      volumeIcon.className = "fa-light fa-volume-xmark";
    } else {
      volumeProgress.value = 50;
      updateVolumeIcon(volumeProgress.value);
    }
    updateVolumeProgressDot();
  });

  const shuffleIcon = document.querySelector(".fa-shuffle");
  const shuffleDot = document.querySelector(".shuffle-dot");
  const repeatIcon = document.querySelector(".fa-arrows-repeat");
  const repeatDot = document.querySelector(".repeat-dot");
  let repeatState = 0;
  shuffleIcon.addEventListener("click", function () {
    const isGreen = shuffleIcon.style.color === "rgb(29, 185, 84)";
    shuffleDot.style.display = isGreen ? "none" : "block";
    shuffleIcon.style.color = isGreen
      ? "rgb(179, 179, 179)"
      : "rgb(29, 185, 84)";
    shuffleIcon.setAttribute(
      "data-title",
      isGreen ? "Enable shuffle" : "Disable shuffle"
    );
  });

  repeatIcon.addEventListener("click", function () {
    if (repeatState === 0) {
      repeatIcon.style.color = "rgb(29, 185, 84)";
      repeatDot.style.display = "block";
      repeatIcon.setAttribute("data-title", "Enable repeat one");
      repeatState = 1;
    } else if (repeatState === 1) {
      repeatIcon.classList.remove("fa-arrows-repeat");
      repeatIcon.classList.add("fa-arrows-repeat-1");
      repeatIcon.setAttribute("data-title", "Disable repeat");
      repeatState = 2;
    } else {
      repeatIcon.style.color = "rgb(179, 179, 179)";
      repeatIcon.classList.remove("fa-arrows-repeat-1");
      repeatIcon.classList.add("fa-arrows-repeat");
      repeatDot.style.display = "none";
      repeatIcon.setAttribute("data-title", "Enable repeat");
      repeatState = 0;
    }
  });

  const playIcon = document.querySelector(".fa-circle-play");
  playIcon.addEventListener("click", function () {
    if (playIcon.classList.contains("fa-circle-play")) {
      playIcon.classList.remove("fa-circle-play");
      playIcon.classList.add("fa-circle-pause");
      playIcon.setAttribute("data-title", "Pause");
    } else {
      playIcon.classList.remove("fa-circle-pause");
      playIcon.classList.add("fa-circle-play");
      playIcon.setAttribute("data-title", "Play");
    }
  });

  const chevronIcon = document.querySelector(".fa-chevron-up");
  const caretIcon = document.querySelector(".fa-light.fa-square-caret-right.footerchevron");
  const rightSide = document.querySelector(".right-side");
  
  // Set initial state
  rightSide.style.display = "flex";
  chevronIcon.classList.remove("fa-chevron-up");
  chevronIcon.classList.add("fa-chevron-down");
  chevronIcon.setAttribute("data-title", "Collapse");
  caretIcon.style.color = "rgb(29, 185, 84)";
  
  function toggleRightSide() {
    if (rightSide.style.display === "none" || rightSide.style.display === "") {
      rightSide.style.display = "flex";
      chevronIcon.classList.remove("fa-chevron-up");
      chevronIcon.classList.add("fa-chevron-down");
      chevronIcon.setAttribute("data-title", "Collapse");
      caretIcon.style.color = "rgb(29, 185, 84)";
    } else {
      rightSide.style.display = "none";
      chevronIcon.classList.remove("fa-chevron-down");
      chevronIcon.classList.add("fa-chevron-up");
      chevronIcon.setAttribute("data-title", "Expand");
      caretIcon.style.color = "";
    }
  }
  
  chevronIcon.addEventListener("click", toggleRightSide);
  caretIcon.addEventListener("click", toggleRightSide);
});
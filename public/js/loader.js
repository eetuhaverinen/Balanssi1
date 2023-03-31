// loader.js
function showLoading() {
  const loadingOverlay = document.querySelector('.loading-overlay');
  loadingOverlay.style.display = 'flex';
}

function hideLoading() {
  const loadingOverlay = document.querySelector('.loading-overlay');
  loadingOverlay.style.display = 'none';
}

// Show the loading page on initial load
showLoading();

// Hide the loading page after a custom duration
const customDuration = 2500; // Duration in milliseconds, e.g., 3000ms = 3 seconds
setTimeout(hideLoading, customDuration);
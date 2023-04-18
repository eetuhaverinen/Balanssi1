const toggleSwitch = document.querySelector('#dark-mode-switch');

// Function to enable or disable dark mode
function toggleDarkMode(enabled) {
  if (enabled) {
    // Enable dark mode
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = '/css/dark-mode.css';
    linkElement.id = 'dark-mode-stylesheet';
    document.head.appendChild(linkElement);
  } else {
    // Disable dark mode
    const darkModeStylesheet = document.getElementById('dark-mode-stylesheet');
    if (darkModeStylesheet) {
      document.head.removeChild(darkModeStylesheet);
    }
  }
}

// Load the user's preferred mode from localStorage
const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
toggleSwitch.checked = darkModeEnabled;
toggleDarkMode(darkModeEnabled);

// Add an event listener to the switch to toggle dark mode
toggleSwitch.addEventListener('change', (event) => {
  const isEnabled = event.target.checked;
  localStorage.setItem('darkMode', isEnabled);
  toggleDarkMode(isEnabled);
});

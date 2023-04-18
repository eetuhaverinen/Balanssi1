const toggleSwitch = document.querySelector('#dark-mode-toggle');

function toggleDarkMode(enabled) {
  if (enabled) {
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = '/public/css/dark-mode.css';
    linkElement.id = 'dark-mode-stylesheet';
    document.head.appendChild(linkElement);
  } else {
    const darkModeStylesheet = document.getElementById('dark-mode-stylesheet');
    if (darkModeStylesheet) {
      document.head.removeChild(darkModeStylesheet);
    }
  }
}

const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
toggleSwitch.checked = darkModeEnabled;
toggleDarkMode(darkModeEnabled);

toggleSwitch.addEventListener('change', (event) => {
  const isEnabled = event.target.checked;
  localStorage.setItem('darkMode', isEnabled);
  toggleDarkMode(isEnabled);
});

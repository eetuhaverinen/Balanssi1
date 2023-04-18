(function() {
  const toggleSwitch = document.querySelector('#toggleDarkMode');

  // Automatically handle dark mode
  if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
    toggleSwitch.checked = true;
    document.documentElement.setAttribute('data-mode', 'dark');
  }

  // Manually handle dark mode
  toggleSwitch.addEventListener('change', (event) => {
    if (event.target.checked) {
      document.documentElement.setAttribute('data-mode', 'dark');
      document.getElementById('darkmode-stylesheet').href = '/css/dark-mode.css';
    } else {
      document.documentElement.removeAttribute('data-mode');
      document.getElementById('main-stylesheet').href = '/css/index.css';
    }
  });
})();

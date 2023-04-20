
document.addEventListener('DOMContentLoaded', function() {
  const darkButton = document.getElementById('darkButton');
  const lightButton = document.getElementById('lightButton');
  const solarButton = document.getElementById('solarButton');
  const body = document.body;

  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    body.classList.add(savedTheme);
  }

  darkButton.addEventListener('click', function(event) {
    event.preventDefault();
    enableDarkMode();
  });

  lightButton.addEventListener('click', function(event) {
    event.preventDefault();
    enableLightMode();
  });

  solarButton.addEventListener('click', function(event) {
    event.preventDefault();
    enableSolarMode();
  });

  function enableDarkMode() {
    body.classList.remove('light', 'solar');
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }

  function enableLightMode() {
    body.classList.remove('dark', 'solar');
    body.classList.add('light');
    localStorage.setItem('theme', 'light');
  }

  function enableSolarMode() {
    body.classList.remove('light', 'dark');
    body.classList.add('solar');
    localStorage.setItem('theme', 'solar');
  }
});

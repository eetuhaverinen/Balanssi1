const darkButton = document.getElementById('darkButton');
const lightButton = document.getElementById('lightButton');
const solarButton = document.getElementById('solarButton');
const body = document.body;
const mainStyleSheet = document.getElementById('main-stylesheet');
const darkModeStyleSheet = document.getElementById('darkmode-stylesheet');
const solarModeStyleSheet = document.getElementById('solarmode-stylesheet');

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  if (savedTheme === 'dark') {
    enableDarkMode();
  } else if (savedTheme === 'solar') {
    enableSolarMode();
  }
}

darkButton.addEventListener('click', enableDarkMode);
lightButton.addEventListener('click', enableLightMode);
solarButton.addEventListener('click', enableSolarMode);

function enableDarkMode() {
  body.classList.replace('light', 'dark');
  mainStyleSheet.setAttribute('href', '');
  darkModeStyleSheet.setAttribute('href', '/css/dark-mode.css?v=123456');
  solarModeStyleSheet.setAttribute('href', '');
  localStorage.setItem('theme', 'dark');
}

function enableLightMode() {
  body.classList.replace('dark', 'light');
  mainStyleSheet.setAttribute('href', '/css/index.css');
  darkModeStyleSheet.setAttribute('href', '');
  solarModeStyleSheet.setAttribute('href', '');
  localStorage.setItem('theme', 'light');
}

function enableSolarMode() {
  body.classList.replace('light', 'solar');
  mainStyleSheet.setAttribute('href', '');
  darkModeStyleSheet.setAttribute('href', '');
  solarModeStyleSheet.setAttribute('href', '/css/solar-mode.css');
  localStorage.setItem('theme', 'solar');
}

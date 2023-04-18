const darkButton = document.getElementById('dark')
const lightButton = document.getElementById('light')
const solarButton = document.getElementById('solar')
const body = document.body
const styleSheet = document.getElementById('main-stylesheet')
const solarStyleSheet = document.getElementById('solarmode-stylesheet')

const theme = localStorage.getItem('theme');

if (theme === 'dark') {
  body.classList.add('dark-mode');
  styleSheet.setAttribute('href', '/css/dark-mode.css');
} else if (theme === 'solar') {
  body.classList.add('solar');
  solarButton.innerText = 'Normalize';
  styleSheet.setAttribute('href', '/css/solar-mode.css');
} else {
  body.classList.add('light-mode');
}

darkButton.addEventListener('click', () => {
  body.classList.replace('light-mode', 'dark-mode');
  styleSheet.setAttribute('href', '/css/dark-mode.css');
  localStorage.setItem('theme', 'dark');
})

lightButton.addEventListener('click', () => {
  body.classList.replace('dark-mode', 'light-mode');
  styleSheet.setAttribute('href', '/css/index.css');
  localStorage.setItem('theme', 'light');
})

solarButton.addEventListener('click', () => {
  if (body.classList.contains('solar')) {
    body.classList.remove('solar');
    solarButton.innerText = 'Solarize';
    styleSheet.setAttribute('href', '/css/index.css');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.add('solar');
    solarButton.innerText = 'Normalize';
    styleSheet.setAttribute('href', '/css/solar-mode.css');
    localStorage.setItem('theme', 'solar');
  }
})

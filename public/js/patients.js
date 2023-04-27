// Attach click handler to patient name links
const patientLinks = document.querySelectorAll('.patient-link');
patientLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = link.getAttribute('href');
  });
});

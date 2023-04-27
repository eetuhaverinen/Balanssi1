const searchInput = document.querySelector('input[type="text"]');
const tableRows = document.querySelectorAll('table tbody tr');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();

  tableRows.forEach(row => {
    const nameCell = row.querySelector('td:first-child');

    if (nameCell.textContent.toLowerCase().includes(query)) {
      row.classList.remove('d-none');
    } else {
      row.classList.add('d-none');
    }
  });
});

// Attach click handler to patient name links
const patientLinks = document.querySelectorAll('.patient-link');
patientLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = link.getAttribute('href');
  });
});

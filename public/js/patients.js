$(document).ready(function () {
  const patients = $('.patient-name');
  const measurementTable = $('#measurementTable');
  const searchBar = $('#searchBar');

  const storiesData = JSON.parse($('#stories-data').text());

  patients.on('click', function (event) {
    event.preventDefault();
    console.log('Patient clicked:', $(this).text());
    const patientId = $(this).data('patient-id');
    const patientStories = storiesData.filter((story) => story.user._id === patientId);

    let tableContent = '';
    patientStories.forEach((story) => {
      tableContent += `
        <tr>
          <td>${new Date(story.createdAt).toLocaleString()}</td>
          <td>${story.mmolPerL}</td>
          <td>${story.feeling}</td>
          <td>${story.GHH}</td>
          <td>${story.sport} ${story.sportDuration} min</td>
          <td>${story.body}</td>
        </tr>
      `;
    });

    measurementTable.html(tableContent);
  });

  searchBar.on('input', function (event) {
    const searchText = $(this).val().toLowerCase();
    patients.each(function () {
      const patientName = $(this).text().toLowerCase();
      if (patientName.includes(searchText)) {
        $(this).closest('tr').show();
      } else {
        $(this).closest('tr').hide();
      }
    });
  });
});

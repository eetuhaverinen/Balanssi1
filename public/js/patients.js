$(document).ready(function () {
  const searchInput = $("#searchBar");
  const patientRows = $(".patient-name").parent().parent();

  // Search functionality
  searchInput.on("keyup", function () {
      const searchTerm = searchInput.val().toLowerCase();

      patientRows.each(function () {
          const name = $(this).find(".patient-name").text().toLowerCase();
          if (name.includes(searchTerm)) {
              $(this).show();
          } else {
              $(this).hide();
          }
      });
  });

  // Handle click event on patient name
  $('.patient-name').on('click', function (e) {
      e.preventDefault();

      // Get patient ID and name from the clicked link
      const patientId = $(this).data('patient-id');
      const patientName = $(this).text();

      // Update the patient name above the measurement table
      $('#patientName').text(patientName);

      // Fetch patient measurements data
      fetchPatientStories(patientId).then((stories) => {
          // Populate the measurement table with the fetched data
          const table = $('.measurementTable');
          table.empty(); // Clear the table

          // Add table headers and populate the table with the stories data
          // Adapt the header names and data properties based on your specific data structure
          table.append('<thead><tr><th>Date</th><th>mmolPerL</th><th>GHH</th><th>Sport Duration</th></tr></thead>');
          const tbody = $('<tbody></tbody>');
          stories.forEach((story) => {
              const createdAt = moment(story.createdAt).format('MMM D, YYYY, h:mm:ss a');
              tbody.append(`<tr><td>${createdAt}</td><td>${story.mmolPerL}</td><td>${story.GHH}</td><td>${story.sportDuration}</td></tr>`);
          });
          table.append(tbody);
      });
  });

  // Function to fetch patient stories data (replace with your API endpoint)
  async function fetchPatientStories(patientId) {
      // Replace with the actual API URL and parameters as needed
      const response = await fetch(`/api/stories?patientId=${patientId}`);
      const data = await response.json();
      return data;
  }
});

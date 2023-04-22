
   const patientNames = document.querySelectorAll('.patient-name');
  const stories = {{{stories}}}


  patientNames.forEach(patientName => {
    patientName.addEventListener('click', (event) => {
      event.preventDefault();
      const patientId = patientName.dataset.patientId;

      const filteredStories = stories.filter(story => story.user._id === patientId);

      let measurementTable = `<tr><td colspan="8"><table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Nimi</th>
                                        <th>Aika</th>
                                        <th>mmol/l</th>
                                        <th>Tuntemus</th>
                                        <th>G HH</th>
                                        <th>Liikunta</th>
                                        <th>Kommentti</th>
                                        <th>Toiminnot</th>
                                    </tr>
                                </thead>
                                <tbody>`;

      filteredStories.forEach(story => {
        measurementTable += `
          <tr>
            <td>${patientName.innerHTML}</td>
            <td>${new Date(story.createdAt).toLocaleString()}</td>
            <td>${story.mmolPerL}</td>
            <td>${story.feeling}</td>
            <td>${story.GHH}</td>
            <td>${story.sport} ${story.sportDuration} min</td>
            <td>${story.body}</td>
            <td>
              <a href="/stories/edit/${story._id}" class="btn btn-primary btn-sm btn-edit" data-story-id="${story._id}">muokkaa</a>
              <button type="button" class="btn btn-danger btn-sm btnDel" data-story-id="${story._id}">Poista</button>
            </td>
          </tr>`;
      });

      measurementTable += `</tbody></table></td></tr>`;

      // Remove any existing measurement table
      const existingMeasurementTable = document.querySelector('.measurement-row');
      if (existingMeasurementTable) {
        existingMeasurementTable.remove();
      }

      // Insert the new measurement table after the clicked patient row
      const newRow = document.createElement('tr');
      newRow.classList.add('measurement-row');
      newRow.innerHTML = measurementTable;
      const parentRow = patientName.closest('tr');
      parentRow.parentNode.insertBefore(newRow, parentRow.nextSibling);
    });
  });


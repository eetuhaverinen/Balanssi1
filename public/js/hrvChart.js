
// Lisätään kuuntelijat checkbox-elementeille, jotta voimme piilottaa tai näyttää valitun datan graafissa
document.getElementById("readinessCheckbox").addEventListener("change", toggleDatasetVisibility);
document.getElementById("lfHfCheckbox").addEventListener("change", toggleDatasetVisibility);
document.getElementById("bloodSugarCheckbox").addEventListener("change", toggleDatasetVisibility);


//päivitetään graafi ja renderöidään uudelleen
function updateChartData(chart, data, hrvValue) {
    chart.data.datasets[0].data = data[hrvValue];
    chart.update();
  }

let chart;

// Piilotetaan tai näytetään datasetit checkboxien tilan perusteella
function toggleDatasetVisibility() {
    const readinessCheckbox = document.getElementById("readinessCheckbox");
    const lfHfCheckbox = document.getElementById("lfHfCheckbox");
    const bloodSugarCheckbox = document.getElementById("bloodSugarCheckbox");
  
    // Asetetaan datasetin "hidden" -ominaisuus vastakkaiseksi checkboxin tilasta
    chart.data.datasets[0].hidden = !readinessCheckbox.checked;
    chart.data.datasets[1].hidden = !lfHfCheckbox.checked;
    chart.data.datasets[2].hidden = !bloodSugarCheckbox.checked;
  
    chart.update(); // Päivitä graafi muutosten jälkeen
  }

  // Luodaan HRV-kaavio ja asetaan se globaaliin muuttujaan "chart"
  async function createHrvChart(labels, dataReadiness, dataLfHf, dataBloodSugar) {
    const ctx = document.getElementById("hrvChart").getContext("2d");
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Readiness",
            data: dataReadiness,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            yAxisID: "yReadiness",
            hidden: false,
          },
          {
            label: "LF/HF",
            data: dataLfHf,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            yAxisID: "yBloodSugar",
            fill: false,
            hidden: true,
          },
          {
            label: "Verensokeri",
            data: dataBloodSugar,
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
            yAxisID: "yBloodSugar",
            fill: false,
            hidden: true,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
              displayFormats: {
                day: "MMM D",
              },
              tooltipFormat: "ll",
            },
          },
          yReadiness: {
            type: "linear",
            position: "left",
            beginAtZero: true,
            title: {
              display: true,
              text: "Readiness",
            },
          },
          yBloodSugar: {
            type: "linear",
            position: "right",
            beginAtZero: true,
            title: {
              display: true,
              text: "Verensokeri (mmol/L), LF/HF",
            },
          },
        },
      },
    });
  }

  // Haetaan data ja luodaan kaavio
  async function fetchDataAndCreateChart() {
    const response = await fetch('/hrvdata');
    const jsonResponse = await response.json();
    const { labels, dataReadiness, dataLfHf, dataBloodSugar } = jsonResponse;
    createHrvChart(labels, dataReadiness, dataLfHf, dataBloodSugar);
  }

  // Kutsutaan fetchDataAndCreateChart-funktiota, kun ikkuna on ladattu
  window.onload = function() {
    fetchDataAndCreateChart();
  }

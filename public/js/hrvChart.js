document.getElementById("readinessCheckbox").addEventListener("change", toggleDatasetVisibility);
document.getElementById("lfHfCheckbox").addEventListener("change", toggleDatasetVisibility);
document.getElementById("bloodSugarCheckbox").addEventListener("change", toggleDatasetVisibility);

function updateChartData(chart, data, hrvValue) {
    chart.data.datasets[0].data = data[hrvValue];
    chart.update();
  }

let chart;

function toggleDatasetVisibility() {
    const readinessCheckbox = document.getElementById("readinessCheckbox");
    const lfHfCheckbox = document.getElementById("lfHfCheckbox");
    const bloodSugarCheckbox = document.getElementById("bloodSugarCheckbox");
  
    chart.data.datasets[0].hidden = !readinessCheckbox.checked;
    chart.data.datasets[1].hidden = !lfHfCheckbox.checked;
    chart.data.datasets[2].hidden = !bloodSugarCheckbox.checked;
  
    chart.update(); // Päivitä graafi muutosten jälkeen
  }

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
  async function fetchDataAndCreateChart() {
    const response = await fetch('/hrvdata');
    const jsonResponse = await response.json();
    const { labels, dataReadiness, dataLfHf, dataBloodSugar } = jsonResponse;
    createHrvChart(labels, dataReadiness, dataLfHf, dataBloodSugar);
  }
//   async function fetchDataAndCreateChart() {
//     const response = await fetch('/hrvdata');
//     const json = await response.json();
    
//     const labels = json.labels;
//     let data = json.dataReadiness;
  
//     createHrvChart(labels, data);
//   }
  
  window.onload = function() {
    fetchDataAndCreateChart();
  }

// document.getElementById("readinessCheckbox").addEventListener("change", toggleDatasetVisibility);
// document.getElementById("lfHfCheckbox").addEventListener("change", toggleDatasetVisibility);
// document.getElementById("bloodSugarCheckbox").addEventListener("change", toggleDatasetVisibility);


// function updateChartData(chart, data, hrvValue) {
//     chart.data.datasets[0].data = data[hrvValue];
//     chart.update();
//   }

// let chart;

// function toggleDatasetVisibility() {
//     const readinessCheckbox = document.getElementById("readinessCheckbox");
//     const lfHfCheckbox = document.getElementById("lfHfCheckbox");
//     const bloodSugarCheckbox = document.getElementById("bloodSugarCheckbox");
  
//     chart.data.datasets[0].hidden = !readinessCheckbox.checked;
//     chart.data.datasets[1].hidden = !lfHfCheckbox.checked;
//     chart.data.datasets[2].hidden = !bloodSugarCheckbox.checked;
  
//     chart.update(); // Päivitä graafi muutosten jälkeen
//   }

//   function createHrvChart(labels, dataReadiness, dataLfHf, dataBloodSugar) {
//     const ctx = document.getElementById("hrvChart").getContext("2d");
//     chart = new Chart(ctx, {
//       type: "bar",
//       data: {
//         labels: labels,
//         datasets: [
//           {
//             label: "Readiness",
//             data: dataReadiness,
//             backgroundColor: "rgba(75, 192, 192, 0.2)",
//             borderColor: "rgba(75, 192, 192, 1)",
//             borderWidth: 1,
//             yAxisID: "yReadiness",
//           },
//           {
//             label: "LF/HF",
//             data: dataLfHf,
//             backgroundColor: "rgba(255, 99, 132, 0.2)",
//             borderColor: "rgba(255, 99, 132, 1)",
//             borderWidth: 1,
//             yAxisID: "yLfHf",
//             fill: false,
//           },
//           {
//             label: "Verensokeri",
//             data: dataBloodSugar.map((entry) => entry.value),
//             backgroundColor: "rgba(255, 206, 86, 0.2)",
//             borderColor: "rgba(255, 206, 86, 1)",
//             borderWidth: 1,
//             yAxisID: "yBloodSugar",
//           },
//         ],
//       },
//       options: {
//         scales: {
//           x: {
//             type: "time",
//             time: {
//               parser: "YYYY-MM-DDTHH:mm:ss.sssZ",
//               unit: "day",
//               displayFormats: {
//                 day: "MMM D",
//               },
//               tooltipFormat: "ll",
//             },
//           },
//           yReadiness: {
//             type: "linear",
//             position: "left",
//             beginAtZero: true,
//             title: {
//               display: true,
//               text: "Readiness",
//             },
//           },
//           yLfHf: {
//             type: "linear",
//             position: "right",
//             beginAtZero: true,
//             title: {
//               display: true,
//               text: "LF/HF",
//             },
//           },
//           yBloodSugar: {
//             type: "linear",
//             position: "right",
//             beginAtZero: true,
//             title: {
//               display: true,
//               text: "Verensokeri (mmol/L)",
//             },
//           },
//         },
//       },
//     });
//   }
//   async function fetchDataAndCreateChart() {
//     const responseHrv = await fetch('/hrvdata');
//     const jsonResponseHrv = await responseHrv.json();
//     const { labels, dataReadiness, dataLfHf } = jsonResponseHrv;
  
//     const responseBloodSugar = await fetch('/bloodsugar');
//     const jsonResponseBloodSugar = await responseBloodSugar.json();
//     const { dataBloodSugar } = jsonResponseBloodSugar;
  
//     createHrvChart(labels, dataReadiness, dataLfHf, dataBloodSugar);
//   }
// //   async function fetchDataAndCreateChart() {
// //     const response = await fetch('/hrvdata');
// //     const json = await response.json();
    
// //     const labels = json.labels;
// //     let data = json.dataReadiness;
  
// //     createHrvChart(labels, data);
// //   }
  
//   window.onload = function() {
//     fetchDataAndCreateChart();
//   }
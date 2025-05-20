let myChart;

document.addEventListener('DOMContentLoaded', () => {
    initializeChart();
    clearChartContents();
});

function initializeChart() {
    const ctx = document.getElementById('chart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Start with empty labels
            datasets: [{
                label: 'Temperature (°C)',
                data: [], // Start with empty data
                borderColor: 'rgba(75, 100, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 3,
                tension: 0.4
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time (seconds)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    },
                    beginAtZero: false,
                    suggestedMin: 0,
                    suggestedMax: 30
                }
            }
        }
    });
}

function clearChartContents() {
    if (myChart) {
        myChart.data.labels = []; // Clear X-axis labels
        myChart.data.datasets[0].data = []; // Clear Y-axis data
        myChart.update(); // Update the chart
    }
}

let measurementCount = 0;

function addMeasurementToChart(temperature) {
    if (measurementCount > 30) {
        console.warn('Maximum of 30 measurements reached.');
        return; // Stop adding new measurements
    }

    myChart.data.labels.push(measurementCount++); // Add the new label (counter value)
    myChart.data.datasets[0].data.push(temperature); // Add the new data point
    myChart.update(); // Update the chart
}
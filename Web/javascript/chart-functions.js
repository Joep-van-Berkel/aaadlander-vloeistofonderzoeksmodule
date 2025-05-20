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
            labels: [], // Empty X-axis labels
            datasets: [{
                label: 'Temperature (°C)',
                data: [], // Empty Y-axis data
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

function addMeasurementToChart(_, temperature) {
    myChart.data.labels.push(measurementCount++); // Increment the counter for each measurement
    myChart.data.datasets[0].data.push(temperature); // Add temperature to Y-axis
    myChart.update(); // Update the chart
}
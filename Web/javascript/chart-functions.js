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
                borderColor: 'rgba(255, 19, 240, 1)',
                backgroundColor: 'rgba(255, 19, 240, 0.2)',
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
    if (measurementCount > 20) {
        console.warn('Maximum of 20 measurements reached.');
        return;
    }

    myChart.data.labels.push(measurementCount);
    myChart.data.datasets[0].data.push(temperature);
    myChart.update();

    measurementCount++;
    const loadPercentage = Math.floor(((measurementCount - 1) / 20) * 100);
    printLoadingBar(loadPercentage);
}
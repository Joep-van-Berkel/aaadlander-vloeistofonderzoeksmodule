let myChart;
let measurementCount = 0;
let measurements = [];

document.addEventListener('DOMContentLoaded', () => {
    initializeChart();
    clearChartContents();

    // Testdata grafiek:
    for (let i = 0; i < 20; i++) {
    addMeasurementToChart((Math.random() * 15).toFixed(2));
    }
});

function initializeChart() {
    const ctx = document.getElementById('chart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Temperature (°C)',
                data: [],
                backgroundColor: 'rgb(196,0,42)',
                borderWidth: 3
            }]
        },
        options: {
            layout: {
                padding: {
                    top: 25,
                    bottom: 5,
                    left: 10,
                    right: 0
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time (seconds)',
                        color: 'white'
                    },
                    ticks: {
                        color: 'white'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Temperature (°C)',
                        color: 'white'
                    },
                    ticks: {
                        color: 'white'
                    },
                    beginAtZero: true,
                }
            }
        }
    });
}

function clearChartContents() {
    if (myChart) {
        myChart.data.labels = [];
        myChart.data.datasets[0].data = [];
        myChart.update();
    }
    measurementCount = 0;
}

function clearChartContentsForLoading() {
    if (myChart) {
        myChart.data.labels = [];
        myChart.data.datasets[0].data = [];
        myChart.update();
    }
}

function addMeasurementToChart(temperature, socket) {

    if (measurementCount >= 20) {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.close();
            console.log('WebSocket connection closed as measurement limit reached.');
        }
        return;
    }

    myChart.data.labels.push(measurementCount);
    myChart.data.datasets[0].data.push(temperature);
    myChart.update();

    measurements.push(temperature);

    measurementCount++;
}

function addMeasurementToChartFromLoading(temperature) {

    myChart.data.labels.push(measurementCount);
    myChart.data.datasets[0].data.push(temperature);
    myChart.update();

    measurements.push(temperature);
}

function getAllMeasurements() {
    return measurements;
}
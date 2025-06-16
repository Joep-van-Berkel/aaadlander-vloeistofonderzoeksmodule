let myChart;
let measurements = [];

document.addEventListener('DOMContentLoaded', () => {
    initializeChart();
    clearChartContents();

    // Test data for the chart:
    // for (let i = 0; i < 20; i++) {
    //     addMeasurementToChart((Math.random() * 15).toFixed(2));
    // }
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
            maintainAspectRatio: false,
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
                        text: 'Measurements',
                        color: 'white'
                    },
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.04)'
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
                    grid: {
                        color: 'rgba(255,255,255,0.04)'
                    },
                    beginAtZero: true,
                }
            },
            animation: false
        }
    });
}

function clearChartContents() {
    if (myChart) {
        myChart.data.labels = [];
        myChart.data.datasets[0].data = [];
        myChart.update();
    }
    measurements = [];
}

function addMeasurementToChart(temperature) {
    if (measurements.length >= 20) return;

    myChart.data.labels.push(measurements.length + 1);
    myChart.data.datasets[0].data.push(temperature);
    myChart.update();

    measurements.push(temperature);
}

function getAllMeasurements() {
    return measurements;
}
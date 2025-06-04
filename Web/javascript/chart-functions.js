let myChart;
let measurementCount = 0;

document.addEventListener('DOMContentLoaded', () => {
    initializeChart();
    clearChartContents();

    // Testdata grafiek:

    // for (let i = 0; i < 21; i++) {
    // addMeasurementToChart((Math.random() * 20).toFixed(2));
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
                        color: 'white' // Set X-axis values font color to white
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Temperature (°C)',
                        color: 'white'
                    },
                    ticks: {
                        color: 'white' // Set Y-axis values font color to white
                    },
                    beginAtZero: false,
                    Min: 0,
                    Max: 20
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
}

function addMeasurementToChart(temperature) {
    if (measurementCount > 20) {

        enableAllButtons()
        return;
    }

    myChart.data.labels.push(measurementCount);
    myChart.data.datasets[0].data.push(temperature);
    myChart.update();

    measurementCount++;
    const loadPercentage = Math.floor(((measurementCount - 1) / 20) * 100);
    printLoadingBar(loadPercentage);
}
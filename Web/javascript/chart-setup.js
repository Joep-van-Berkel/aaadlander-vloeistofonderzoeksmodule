document.addEventListener('DOMContentLoaded', () => {
    // Select the canvas element
    const ctx = document.getElementById('chart').getContext('2d');

    // Initialize the chart
    const myChart = new Chart(ctx, {
        type: 'line', // Line chart
        data: {
            labels: [1, 2, 3, 4, 5], // X-axis labels (seconds)
            datasets: [{
                label: 'Temperature (°C)', // Label for the dataset
                data: [22, 24, 23, 25, 26], // Y-axis values (temperature)
                borderColor: 'rgba(75, 100, 192, 1)', // Line color
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill under the line
                borderWidth: 3, // Line thickness
                tension: 0.4 // Smooth curve
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time (seconds)' // X-axis title
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Temperature (°C)' // Y-axis title
                    },
                    beginAtZero: false // Start Y-axis at the lowest value
                }
            }
        }
    });
});
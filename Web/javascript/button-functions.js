function clickUnfoldModule() {
    printToConsole('Unfolding module...');
}

function clickStartMeasurement() {
    printToConsole('starting measurements...');

    const socket = new WebSocket('ws://145.49.127.248:1880/ws/groep8'); // Replace with your WebSocket URL

    socket.addEventListener('open', () => {
        console.log('WebSocket connection established');
    });

    socket.addEventListener('message', (event) => {
        try {
            console.log('Received data:', event.data);
            const data = JSON.parse(event.data); // Parse the incoming JSON data

            if (data.temperature_2) {
                addMeasurementToChart(data.temperature_2); // Pass only temperature to the chart
            } else {
                console.warn('Invalid data format:', data);
            }
        } catch (error) {
            console.error('Error processing WebSocket message:', error);
        }
    });
}

function clickLoadResults() {
    printToConsole('Loading results...');
}
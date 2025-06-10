function clickUnfoldModule() {
    clearConsole()
    printToConsole('Unfolding mechanical arm outside the module...');
    sendCommandToNodeRED('digital_output_3=255');
}

function clickFoldModule() {
    clearConsole()
    printToConsole('Folding in mechanical arm.');
    sendCommandToNodeRED('digital_output_3=0');
}

function clickPumpLiquid() {
    clearConsole()
    printToConsole('Pumping liquid into the tank on the module...');
    sendCommandToNodeRED('digital_output_2=255');
}

function clickStartMeasurement() {
    clearConsole()
    printToConsole('Retrieving temperature measurements from module...');

    disableAllButtonsForDuration(20000)

    const socket = new WebSocket('ws://145.49.127.248:1880/ws/groep8');

    socket.addEventListener('open', () => {
        console.log('WebSocket connection established');
    });

    socket.addEventListener('message', (event) => {
        try {
            console.log('Received data:', event.data);
            const data = JSON.parse(event.data);

            if (data.temperature_2) {
                addMeasurementToChart(data.temperature_2);
            } else {
                console.warn('Invalid data format:', data);
            }
        } catch (error) {
            console.error('Error processing WebSocket message:', error);
        }
    });
}

function clickUnloadLiquid(){
    clearConsole()
    printToConsole('Unloading liquid tank on the module...');
    sendCommandToNodeRED('digital_output_2=0');
}

function clickClearChart(){
    clearConsole()
    printToConsole('Measurements in the chart have been cleared.');
    clearChartContents()
}

function disableAllButtonsForDuration(duration) {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.disabled = true);

    setTimeout(() => {
        buttons.forEach(button => button.disabled = false);
    }, duration);
}

//NodeRED
function sendCommandToNodeRED(command) {
    fetch(`http://145.49.127.248:1880/groep8?${command}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Command sent successfully:', data);
        })
        .catch(error => {
            console.error('Error sending command to Node-RED:', error);
        });
}

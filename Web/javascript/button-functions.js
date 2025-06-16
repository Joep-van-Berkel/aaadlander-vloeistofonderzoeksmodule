let socket;

function clickUnfoldModule() {
    const DURATION = 4;
    const STARTMESSAGE = "Unfolding the mechanical arm outside the module";
    const COMPLETIONMESSAGE = "Done unfolding the mechanical arm";

    sendCommandToNodeRED('digital_output_3=255');

    disableAllButtonsForDuration(DURATION);
    clearConsole();
    printToConsole(STARTMESSAGE);
    printLoadingBar(DURATION, COMPLETIONMESSAGE);
}

function clickFoldModule() {
    const DURATION = 3.5;
    const STARTMESSAGE = "Retracting the mechanical arm";
    const COMPLETIONMESSAGE = "Done retracting the mechanical arm";

    sendCommandToNodeRED('digital_output_3=0');

    disableAllButtonsForDuration(DURATION);
    clearConsole();
    printToConsole(STARTMESSAGE);
    printLoadingBar(DURATION, COMPLETIONMESSAGE);
}

function clickPumpLiquid() {
    const DURATION = 10;
    const STARTMESSAGE = "Pumping liquid into the tank on the module";
    const COMPLETIONMESSAGE = "Done pumping the liquid into the tank";

    sendCommandToNodeRED('digital_output_2=255');

    disableAllButtonsForDuration(DURATION);
    clearConsole();
    printToConsole(STARTMESSAGE);
    printLoadingBar(DURATION, COMPLETIONMESSAGE);
}

function clickStartMeasurement() {
    const DURATION = 20;
    const STARTMESSAGE = "Retrieving temperature measurements from module";
    const COMPLETIONMESSAGE = "Successfully retrieved all temperature measurements";

    if (socket && socket.readyState !== WebSocket.CLOSED) {
        socket.close();
        console.info('Previous WebSocket connection closed.');
    }

    disableAllButtonsForDuration(DURATION);
    clearConsole();
    printToConsole(STARTMESSAGE);
    printLoadingBar(DURATION, COMPLETIONMESSAGE);

    clearChartContents();

    socket = new WebSocket('ws://145.49.127.248:1880/ws/groep8');

    socket.addEventListener('open', () => {
        console.info('WebSocket connection established');
    });

    socket.addEventListener('message', (event) => {
        try {
            console.info('Received data:', event.data);
            const data = JSON.parse(event.data);

            if (data.temperature_2) {
                addMeasurementToChart(data.temperature_2);
            } else {
                console.warn('Invalid data format:', data);
            }

            if (measurements.length >= 20) {
                socket.close();
                console.info('WebSocket connection closed as measurement limit reached.');
            }
        } catch (error) {
            console.error('Error processing WebSocket message:', error);
        }
    });

    socket.addEventListener('close', () => {
        console.info('WebSocket connection closed');
    });
}

function clickUnloadLiquid(){
    const DURATION = 12;
    const STARTMESSAGE = "Unloading the liquid tank on the module"
    const COMPLETIONMESSAGE = "Done unloading the liquid from the tank"

    disableAllButtonsForDuration(DURATION, COMPLETIONMESSAGE);
    clearConsole()
    printToConsole(STARTMESSAGE);
    sendCommandToNodeRED('digital_output_2=0');
}

function clickClearChart(){
    clearChartContents()
    clearConsole()
    printToConsole('Measurements in the chart have been cleared.');

    // location.reload();
}

function disableAllButtonsForDuration(durationInSeconds) {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.disabled = true);

    setTimeout(() => {
        buttons.forEach(button => button.disabled = false);
    }, durationInSeconds * 1000);
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
            console.info('Command sent successfully:', data);
        })
        .catch(error => {
            console.error('Error sending command to Node-RED:', error);
        });
}

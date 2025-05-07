document.addEventListener('DOMContentLoaded', () => {
    const startMeasurementsButton = document.querySelector('.button-container button:nth-child(2)');
    if (startMeasurementsButton) {
        startMeasurementsButton.addEventListener('click', () => printToConsole('starting measurements...'));
    }
});
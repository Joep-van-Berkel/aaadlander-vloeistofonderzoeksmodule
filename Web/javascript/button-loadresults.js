document.addEventListener('DOMContentLoaded', () => {
    const loadResultsButton = document.querySelector('.button-container button:nth-child(3)');
    if (loadResultsButton) {
        loadResultsButton.addEventListener('click', () => printToConsole('Loading results...'));
    }
});
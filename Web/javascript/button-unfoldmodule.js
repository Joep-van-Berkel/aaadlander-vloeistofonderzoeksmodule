document.addEventListener('DOMContentLoaded', () => {
    const unfoldModuleButton = document.querySelector('.button-container button:nth-child(1)');
    if (unfoldModuleButton) {
        unfoldModuleButton.addEventListener('click', () => printToConsole('Unfolding module...'));
    }
});


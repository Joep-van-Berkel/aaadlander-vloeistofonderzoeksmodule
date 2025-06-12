function printToConsole(messages) {
    const consoleField = document.querySelector('.console-field');
    if (!consoleField) return;

    const timestamp = new Date().toLocaleTimeString();
    (Array.isArray(messages) ? messages : [messages]).forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${timestamp} > ${message}`;
        messageElement.style.color = 'white';
        messageElement.style.margin = '5px 0';
        messageElement.style.fontFamily = 'Consolas';
        messageElement.style.border = 'none';
        consoleField.appendChild(messageElement);
    });

    consoleField.scrollTop = consoleField.scrollHeight;
}

function clearConsole() {
    const consoleField = document.querySelector('.console-field');
    if (consoleField){
        consoleField.innerText = '';
    }
}

let lastDisplayedPercentage = 0;

function printLoadingBar(percentage) {
    const consoleField = document.querySelector('.console-field');
    if (!consoleField) return;

    let loadingBar = document.querySelector('.loading-bar');
    if (!loadingBar) {
        loadingBar = document.createElement('div');
        loadingBar.className = 'loading-bar';
        loadingBar.style.color = 'lightgreen';
        loadingBar.style.margin = '5px 0';
        loadingBar.style.fontFamily = 'Consolas';
        loadingBar.style.border = 'none';
        consoleField.appendChild(loadingBar);
    }

    const blocks = Math.floor(percentage / 5); // Number of ▰ blocks
    const dashes = 20 - blocks; // Remaining ═ dashes
    loadingBar.textContent = `${percentage}%  ` + `▰`.repeat(blocks) + ` `.repeat(dashes);
    lastDisplayedPercentage = percentage;
}

printLoadingBar(0);


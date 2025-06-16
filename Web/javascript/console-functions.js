function printToConsole(messages) {
    const consoleField = document.querySelector('.console-field');
    if (!consoleField) return;

    const timestamp = new Date().toLocaleTimeString();
    (Array.isArray(messages) ? messages : [messages]).forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${timestamp} > ${message}`;
        messageElement.style.color = 'white';
        messageElement.style.margin = '5px 0';
        messageElement.style.fontFamily = 'Consolas, monospace';
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

function printLoadingBar(durationInSeconds, completionMessage) {
    const consoleField = document.querySelector('.console-field');
    if (!consoleField) return;

    let loadingBar = document.querySelector('.loading-bar');
    if (!loadingBar) {
        loadingBar = document.createElement('div');
        loadingBar.className = 'loading-bar';
        loadingBar.style.color = 'rgb(196,0,42)';
        loadingBar.style.margin = '10px 0';
        loadingBar.style.fontFamily = 'Consolas';
        loadingBar.style.border = 'none';
        consoleField.appendChild(loadingBar);
    }

    const totalBlocks = 50;
    const interval = 100;
    const totalTime = durationInSeconds * 1000;
    let elapsedTime = 0;

    const intervalId = setInterval(() => {
        elapsedTime += interval;
        const percentage = Math.min((elapsedTime / totalTime) * 100, 100);
        const blocks = Math.floor((percentage / 100) * totalBlocks);
        const dashes = totalBlocks - blocks;

        loadingBar.textContent = `${Math.floor(percentage)}%  ` + `▰`.repeat(blocks) + ` `.repeat(dashes);

        if (elapsedTime >= totalTime) {
            clearInterval(intervalId);
            printToConsole(completionMessage);
        }
    }, interval);
}



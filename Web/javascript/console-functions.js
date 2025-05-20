
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
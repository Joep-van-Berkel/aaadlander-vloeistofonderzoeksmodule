document.addEventListener('DOMContentLoaded', () => {

    loadMetingTimestamps();
});

async function clickSaveMeasurements() {
    try {
        // Create a new MetingTijdstempel and return the metingID
        const metingTijdstempelResponse = await fetch('http://localhost:8080/meting-tijdstempels', {
            method: 'POST'
        });

        if (!metingTijdstempelResponse.ok) {
            throw new Error(`Failed to create MetingTijdstempel: ${metingTijdstempelResponse.status}`);
        }

        const metingID = await metingTijdstempelResponse.json();

        // Retrieve measurements from chart and send them to the createBulkMetingen endpoint
        const measurements = getAllMeasurements();

        const metingenResponse = await fetch(`http://localhost:8080/metingen/bulk?metingID=${metingID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(measurements)
        });

        if (!metingenResponse.ok) {
            throw new Error(`Failed to save metingen: ${metingenResponse.status}`);
        }

        console.log('Measurements saved successfully');
    } catch (error) {
        console.error('Error:', error);
    }
}

function clickLoadMeasurements() {

}

async function loadMetingTimestamps() {
    try {
        // Fetch all MetingTijdstempels from the backend
        const response = await fetch('http://localhost:8080/meting-tijdstempels');

        if (!response.ok) {
            throw new Error(`Failed to load MetingTijdstempels: ${response.status}`);
        }

        const metingTijdstempels = await response.json();

        // Get the database div to display the list
        const databaseDiv = document.querySelector('.database');
        databaseDiv.innerHTML = ''; // Clear the placeholder content

        // Create a list to display the MetingTijdstempels
        const list = document.createElement('ul');
        list.style.listStyleType = 'none';
        list.style.padding = '0';

        metingTijdstempels.forEach((tijdstempel) => {
            const listItem = document.createElement('li');
            listItem.textContent = `MetingID: ${tijdstempel.metingID}, Timestamp: ${tijdstempel.metingTijdstempel}`;
            listItem.style.margin = '10px 0';
            listItem.style.color = 'white';
            listItem.style.fontFamily = 'system-ui';
            listItem.style.fontSize = '18px';
            list.appendChild(listItem);
        });

        databaseDiv.appendChild(list);
    } catch (error) {
        console.error('Error:', error);
    }
}


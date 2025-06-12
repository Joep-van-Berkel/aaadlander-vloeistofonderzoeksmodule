let selectedMetingID = null;

document.addEventListener('DOMContentLoaded', () => {

    loadMetingTimestamps();

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.clickable-row')) {
            document.querySelectorAll('.clickable-row').forEach((row) => row.classList.remove('selected'));
            selectedMetingID = null;
        }
    });
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
    } catch (error) {
        console.error('Error while saving measurements:', error);
    }
    loadMetingTimestamps()
}

async function clickLoadMeasurements() {
    if (selectedMetingID) {
        try {
            const response = await fetch(`http://localhost:8080/metingen/${selectedMetingID}`);

            if (!response.ok) {
                throw new Error(`Failed to load metingen: ${response.status}`);
            }

            const metingen = await response.json();

            clearChartContentsForLoading();

            metingen.forEach((measurement) => {
                if (measurement.temperatuur !== undefined) {
                    addMeasurementToChartFromLoading(measurement.temperatuur);
                } else {
                    console.error('Temperature property is missing in:', measurement);
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        console.log('No row selected.');
    }
}

async function loadMetingTimestamps() {
    try {
        const response = await fetch('http://localhost:8080/meting-tijdstempels');

        if (!response.ok) {
            throw new Error(`Failed to load MetingTijdstempels: ${response.status}`);
        }

        const metingTijdstempels = await response.json();

        const databaseDiv = document.querySelector('.database');
        databaseDiv.innerHTML = '';

        const table = document.createElement('table');
        table.classList.add('database-table');

        const headerRow = document.createElement('tr');
        ['MetingID', 'Date', 'Time'].forEach((headerText) => {
            const th = document.createElement('th');
            th.textContent = headerText;
            th.classList.add('table-header');
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        metingTijdstempels.forEach((tijdstempel) => {
            const date = new Date(tijdstempel.tijdstempel);
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
            const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

            const row = document.createElement('tr');
            row.classList.add('clickable-row');
            row.addEventListener('click', () => {
                // Remove 'selected' class from all rows
                document.querySelectorAll('.clickable-row').forEach((r) => r.classList.remove('selected'));

                // Add 'selected' class to the clicked row
                row.classList.add('selected');

                // Store the selected MetingID
                selectedMetingID = tijdstempel.metingID;
            });

            [tijdstempel.metingID, formattedDate, formattedTime].forEach((cellText) => {
                const td = document.createElement('td');
                td.textContent = cellText;
                td.classList.add('table-cell');
                row.appendChild(td);
            });

            table.appendChild(row);
        });

        databaseDiv.appendChild(table);
    } catch (error) {
        console.error('Error:', error);
    }
}


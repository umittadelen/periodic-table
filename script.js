// Series to CSS class mapping, add default for missing "N/A" elements
const seriesClassMap = {
    "Noble gases": "noble-gases",
    "Alkali metals": "alkali-metals",
    "Alkaline earth metals": "alkaline-earth-metals",
    "Metalloids": "metalloids",
    "Nonmetals": "nonmetals",
    "Reactive nonmetals": "reactive-nonmetals",
    "Transition metals": "transition-metals",
    "Post-transition metals": "post-transition-metals",
    "Lanthanoids": "lanthanoids",
    "Actinoids": "actinoids",
    "N/A": "unknown-series"
};

// Function to create the table and fill it with elements
function createPeriodicTable(elements) {
    const table = document.getElementById('periodic-table');

    // Clear existing table content
    table.innerHTML = '';

    // Create a header row for column numbers
    const headerRow = document.createElement('tr');
    headerRow.appendChild(document.createElement('th')); // Top-left cell for the header

    for (let col = 1; col <= 18; col++) {
        const th = document.createElement('th');
        th.innerText = col; // Set column number
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    // Create rows and add row numbers
    for (let row = 1; row <= 11; row++) {
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.innerText = row; // Set row number
        tr.appendChild(th); // Add row number to the start of the row

        for (let col = 0; col < 18; col++) {
            const td = document.createElement('td');
            td.setAttribute('data-x', col);
            td.setAttribute('data-y', row);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    // Loop through elements and place them in the correct cells
    elements.forEach(element => {
        const { x, y } = element.position;
        // Adjust y by adding 1 to match header row
        const adjustedY = y + 1; 
        const cell = document.querySelector(`td[data-x="${x}"][data-y="${adjustedY}"]`);

        if (cell) { // Check if cell is found
            // Add content to the cell
            cell.innerHTML = `
                <span class="${element.name !== "" ? 'atomic_number' : ''}">${element.atomic_number}</span>
                <div class="symbol">${element.symbol}</div>
                <span>${element.name}</span>
                <span>${element.weight}</span>
            `;

            // Apply the correct series class for color
            const seriesClass = seriesClassMap[element.series] || 'unknown-series';
            if (seriesClass) {
                cell.classList.add(seriesClass);
                cell.classList.add("element");
                if (element.name == "") {
                    cell.classList.add("element");
                }
                
            }
        } else {
            console.warn(`Cell not found for element: ${element.symbol} at position x:${x}, y:${adjustedY}`);
        }
    });
}

// Function to load JSON data and initialize the table
function loadJSON() {
    fetch('./elements.json')
        .then(response => response.json())
        .then(data => {
            createPeriodicTable(data.elements);
        })
        .catch(error => {
            console.error("Error loading JSON file:", error);
        });
}

// Initialize the table on page load
window.onload = loadJSON;

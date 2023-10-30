/* Creating and styling the table and table rows */

document.addEventListener('DOMContentLoaded', () => {
    fetch("./providerData.json")
        .then(response => response.json())
        .then(data => {
            const providerTableData = document.getElementById('provider-table-Data');            
            const thead = document.createElement('thead'); // Create the table header
            const headerRow = document.createElement('tr');            
            
            // Define the headers
            const headers = {
                "Name": "Name",
                "NPI": "NPI",
                "Facility": "Facility",
                "Taxonomy and Specialty": "Taxonomy and Specialty",
                "License #": "License #"
            };
            for (const key in headers) {
                const headerCell = document.createElement('th');
                headerCell.textContent = headers[key];
            
                if (headerCell.textContent === 'Name' || headerCell.textContent === 'Facility') {
                    const dropdownContainer = document.createElement('div'); // Create a container for the custom dropdown
                    
                    // Create a button to open the modal
                    const dropdownButton = document.createElement('button');
                    dropdownButton.textContent = headerCell.textContent;
                    dropdownContainer.className = 'dropdown-button';
            
                    // Apply the same styling as other headers
                    dropdownContainer.style.border = "4px solid";
                    dropdownContainer.style.textAlign = "center";
                    dropdownContainer.style.padding = '30px 150px';
                    dropdownContainer.style.fontFamily = 'Roboto, sans-serif';
                    dropdownContainer.style.fontSize = '1.5em';
                    dropdownContainer.style.fontWeight = 'bolder';
                    dropdownContainer.style.backgroundColor = '#F9B572';
            
                    // Create a modal container for the checkboxes
                    const modal = document.createElement('div');
                    modal.className = 'modal';                                
                    
                    
                    // Create a list to hold the checkboxes
                    const checkboxList = document.createElement('ul');
                    checkboxList.className = 'checkbox-list';
                    
                    checkboxList.style.listStyleType= 'none';                    
                    
                    
                    if(headerCell.textContent === 'Name') {
                        providers.forEach(provider => {
                            const checkboxItem = document.createElement('li');
                            const checkbox = document.createElement('input');
                            checkbox.type = 'checkbox';
                            checkbox.value = provider;
                            checkbox.name = headerCell.textContent;
                            checkbox.id = `${headerCell.textContent}-${provider}`;
                            const label = document.createElement('label');
                            label.textContent = provider;
                            label.setAttribute('for', `${headerCell.textContent}-${provider}`);
                            checkboxItem.appendChild(checkbox);
                            checkboxItem.appendChild(label);
                            checkboxList.appendChild(checkboxItem);
                        });
                    } else if(headerCell.textContent === 'Facility'){
                        clinics.forEach(clinic => {
                            const checkboxItem = document.createElement('li');
                            const checkbox = document.createElement('input');
                            checkbox.type = 'checkbox';
                            checkbox.value = clinic;
                            checkbox.name = headerCell.textContent;
                            checkbox.id = `${headerCell.textContent}-${clinic}`;
                            const label = document.createElement('label');
                            label.textContent = clinic;
                            label.setAttribute('for', `${headerCell.textContent}-${clinic}`);
                            checkboxItem.appendChild(checkbox);
                            checkboxItem.appendChild(label);
                            checkboxList.appendChild(checkboxItem);
                    });

                    }

                    modal.appendChild(checkboxList);
            
                    modal.style.display = 'none'; // Initially hide the modal

                    dropdownButton.addEventListener('click', function () {
                        modal.style.display = 'block';                        
                        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
                        checkboxes.forEach(checkbox => {
                            checkbox.addEventListener('change', filterTable);
                        });

                        // Define the filterTable function
                        function filterTable() {
                            // Get the selected options (checkboxes)
                            const selectedOptions = Array.from(checkboxes)
                                .filter(checkbox => checkbox.checked)
                                .map(checkbox => checkbox.value);
                        
                            // Get all table rows
                            const rows = document.querySelectorAll('table tr');
                        
                            // If no checkboxes are selected, show all rows
                            if (selectedOptions.length === 0) {
                                rows.forEach(row => {
                                    row.style.display = 'table-row';
                                });
                            } else {
                                // Iterate through the rows and hide/show based on selected options
                                rows.forEach(row => {
                                    const rowData = row.textContent.toLowerCase();
                                    if (selectedOptions.some(option => rowData.includes(option.toLowerCase()))) {
                                        row.style.display = 'table-row'; // Show the row
                                    } else {
                                        row.style.display = 'none'; // Hide the row
                                    }
                                });
                            }
                        }
                        

                        // Add a click event listener to the document body
                        document.body.addEventListener('click', closeModalOnClickOutside);

                        // Prevent the click event from propagating to the body
                        event.stopPropagation();
                    });

                    // Function to close the modal when clicked outside
                    function closeModalOnClickOutside(event) {
                        if (event.target !== modal && !modal.contains(event.target)) {
                            modal.style.display = 'none';
                            document.body.removeEventListener('click', closeModalOnClickOutside);
                        }
                    }

                    const closeBtn = document.createElement('span');
                    closeBtn.textContent = ' 🆇 Close';
                    closeBtn.className = 'close';
                    closeBtn.style.fontSize = 'x-larger';
                    closeBtn.style.textAlign = 'right';
                    closeBtn.style.textAlign = 'top';
                    closeBtn.style.color = 'white';
                    

                    closeBtn.addEventListener('click', function () {
                        modal.style.display = 'none';
                    });

                    modal.appendChild(closeBtn);
                    modal.style.display = 'none';
                    
                    dropdownContainer.appendChild(dropdownButton);
                    dropdownContainer.appendChild(modal);

                    headerRow.appendChild(dropdownContainer); // Append the custom dropdown container to the header row
                } else {
                    headerCell.style.border = "4px solid";
                    headerCell.style.textAlign = "center";
                    headerCell.style.padding = '30px';
                    headerCell.style.fontFamily = 'Roboto, sans-serif';
                    headerCell.style.fontSize = '1.5em';
                    headerCell.style.fontWeight = 'bolder';
                    headerCell.style.backgroundColor = '#F9B572';
                    headerRow.appendChild(headerCell);
                }
            }
            
            
            

            thead.appendChild(headerRow);
            providerTableData.appendChild(thead);

            const tbody = document.createElement('tbody');

            data.forEach(rowData => {                       // format table 
                const row = document.createElement('tr');

                for (const key in headers) {
                    const cell = document.createElement('td');
                    cell.textContent = rowData[key] || '';
                    cell.style.border = "2px solid";
                    cell.style.padding = "10px";                    
                    row.appendChild(cell);
                }

                tbody.appendChild(row);
                
            });

            providerTableData.appendChild(tbody);

            const rows = document.querySelectorAll('tr');


            rows.forEach(row => {                               // Change the row color depending on address
                const cells = row.querySelectorAll('td');
                let hasNorth = false;
                let hasWest = false;
                let hasCentro = false;
                let hasMesa = false;
                let hasCLF = false;
                let hasCasaGrande = false;
                let hasElMirage = false;
                let hasLaveen = false;
                let hasTempe = false;

                cells.forEach(cell => {
                    if (cell.textContent === 'CLF West/Glendale - 7734 N 59th Ave Glendale AZ 85301') {
                        hasWest = true;
                        return; 
                    } else if(cell.textContent === 'CLF Laveen - 4250 W Baseline Rd Phoenix, AZ 85041'){
                    hasLaveen = true;
                        return;
                    }else if(cell.textContent === 'CLF Mesa - 616 E Southern Ave #103,Mesa AZ 85204') {
                        hasMesa = true;
                        return;
                    } else if(cell.textContent === 'CLF El Mirage - 15235 N Dysart Rd El Mirage AZ 85335'){
                        hasElMirage = true;
                        return;
                    }else if (cell.textContent === 'CLF North - 13402 N 32nd St Phoenix AZ 85032'){
                        hasNorth = true;
                    }else if (cell.textContent === 'CLF Downtown - 1533 E Willetta St Phoenix AZ 85006'){
                        hasCentro = true;
                        return;
                    } else if(cell.textContent === 'CLF Casa Grande - 301 E Cottonwood Ln Casa Grande AZ 85122'){
                        hasCasaGrande = true;
                        return;
                    } else if(cell.textContent === 'CLF Tempe - 1315 W Southern Ave Tempe, AZ 85282'){
                        hasTempe = true;
                        return;
                    }else if(cell.textContent === "Clinica La Familia"){
                        hasCLF = true;
                        return;
                    }
                });

                if (hasWest) {
                    row.style.backgroundColor = '#D2E0FB'; // Set the row's background color to green
                }if(hasLaveen){
                    row.style.backgroundColor = '#F9F3CC';
                }if(hasMesa){
                    row.style.backgroundColor = '#D7E5CA';
                }if(hasElMirage){
                    row.style.backgroundColor = '#8EACCD';
                }if(hasNorth){
                    row.style.backgroundColor = '#A0E9FF'
                }if(hasCentro){
                    row.style.backgroundColor = '#89CFF3'
                }if(hasCasaGrande){
                    row.style.backgroundColor = '#8E8FFA'
                }if(hasCLF){
                    row.style.backgroundColor= '#192655'
                    row.style.color = "#ffffff"
                    row.style.border = "4px solid black"
                }if(hasTempe){
                    row.style.backgroundColor = "#D0BFFF"
                }
            });

        });

});

function filterTable() {
    // Get the selected options (checkboxes)
    const selectedOptions = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    // Get all table rows
    const rows = document.querySelectorAll('table tr');

    // Iterate through the rows and hide/show based on selected options
    rows.forEach(row => {
        const rowData = row.textContent.toLowerCase();
        if (selectedOptions.every(option => rowData.includes(option.toLowerCase()))) {
            row.style.display = 'table-row'; // Show the row
        } else {
            row.style.display = 'none'; // Hide the row
        }
    });
}



const providers = [    
    'Clinica La Familia',
    'Aaron J Jensen', 
    'Alex Guzman Garcia', 
    'Alma Navarro',
    'Amanda Rascon',
    'Andrew C. White',
    'Blair Ball',
    'Carlomagno Calderon Briones',
    'Carmen M. Rivera',
    'Celina Ruiz Escamilla',
    'Christine C Briones',
    'Claudia Ivone Romo',
    'Drisde Isabel Cruz Martinez',
    'Elizabeth Lopez-Murray',
    'Erick G. Gonzalez',
    'Erick Torres',
    'Fernando Galaviz',
    'Flor N Arellano',
    'Francis Rahul Luciano',
    'Freddy L Montenegro',
    'Gloria A. Estrada',
    'Grace Stracuzzi',
    'Haidee Chavez Waymire',
    'J. Guadalupe Gallo Padilla',
    'Javier G Padilla',
    'Jennyfer Willford',
    'Jessica Cuevas',
    'Julia Calderon',
    'Julia Nieto',
    'Maria Del Carmen Castillo',
    'Nina Alexandria Celaya',
    'Ricardo G. Celaya',
    'Ruby E Fernandez',
    'Russell Patrick Jackson',
    'Sam F. Shumway',
    'Sandy Pauline Morales',
    'Seth Evert Gillespie',
    'Walter Rios-Corujo',
    'Xochitl Landeros',
    'Yesenia E. Ochoa']

    const clinics = [
        'North',
        'West',
        'Downtown',
        'Mesa',
        'Tempe',
        'Casa Grande',
        'El Mirage',
        'Laveen'
    ]


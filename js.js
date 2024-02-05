document.addEventListener('DOMContentLoaded', () => {
    fetch("./providerData.json")
        .then(response => response.json())
        .then(data => {
            const providerTableData = document.createElement('table');
            providerTableData.id = 'provider-table-Data';
            
            // Create table header
            const thead = document.createElement('thead');
            thead.classList.add("tableHeader");
            const headerRow = document.createElement('tr');
            
            Object.keys(data[0]).forEach((header, index) => {
                const headerCell = document.createElement('th');
                headerCell.textContent = header;
                
                
            
                // if (index === 0) {
                //     // Add a button to the first header
                //     const filterButton = document.createElement('button');
                //     filterButton.textContent = 'Name';
                //     filterButton.addEventListener('click', () => {
                //         // Do this later, add the handle button click for the first header

                //     });
                //     headerCell.appendChild(filterButton);
                // }
            
                headerRow.appendChild(headerCell);
            });
            
            thead.appendChild(headerRow);
            providerTableData.appendChild(thead);
            

            // Create table body
            const tbody = document.createElement('tbody');

            data.forEach(rowData => {
                const row = document.createElement('tr');

                Object.values(rowData).forEach(value => {
                    const cell = document.createElement('td');
                    cell.textContent = value || '';
                    row.appendChild(cell);
                });

                tbody.appendChild(row);
            });

            providerTableData.appendChild(tbody);

            // Append the table to the body
            document.body.appendChild(providerTableData);

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
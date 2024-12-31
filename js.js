const PCPChange = (providername, npi, address) => {
    const message = `From: Clinica La Familia

In order to have everything ready for your appointment you need to contact your insurance company and update your information, please call the member services phone number located on the back of your insurance card and:

Update your primary care provider (PCP) EFFECTIVE TODAY by giving them the following info:

- Name of the physician: ${providername}
- NPI: ${npi}
- Tax ID: 861039168
- Address: ${address}
- Office Phone: 602-569-3999

PLEASE DONT FORGET TO ASK FOR YOUR REFERENCE NUMBER AND WRITE IT DOWN. If you are told that you don't have a reference number, please ask for the representative's name and the initial of their last name, and make a note of the date of the call. THANK YOU`;

    // Copy to clipboard
    navigator.clipboard.writeText(message).then(() => {
        alert("Message copied to clipboard");
    }).catch(err => {
        console.error("Could not copy text: ", err);
    });
};

const PCPChangeEspanol = (providername, npi, address) => {
    const message = `De: Clínica La Familia

Para tener todo listo para su cita, es necesario que llame a su compañía de seguro y actualice sus datos. Por favor, llame al numero de servicio al cliente que aparece al reverso de su tarjeta de seguro y:

Actualice su medico primario (PCP) A PARTIR DE HOY  proporcionándoles la siguiente información:

- Nombre: ${providername}
- NPI: ${npi}
- Tax ID: 861039168
- Dirección: ${address}
- Numero telefónico: 602-569-3999

POR FAVOR NO OLVIDE PREGUNTAR POR UN NUMERO DE REFERENCIA Y ESCRIBIRLO **si le dicen que no tiene numero de referencia pida el nombre y la inicial del apellido del representante y anote la fecha de la llamada** GRACIAS
`
navigator.clipboard.writeText(message).then(() =>{
    alert("Message copied to clipboard");
}).catch(err => {
    console.error("Could not copy text: ", err);
})

}

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
            
            Object.keys(data[0]).forEach(header => {
                const headerCell = document.createElement('th');
                headerCell.textContent = header;                
                headerRow.appendChild(headerCell);
            });
            
            thead.appendChild(headerRow);
            providerTableData.appendChild(thead);

            // Create table body
            const tbody = document.createElement('tbody');

            data.forEach(rowData => {
                const row = document.createElement('tr');
                
                Object.entries(rowData).forEach(([key, value]) => {
                    const cell = document.createElement('td');
                    cell.textContent = value || '';
                    row.appendChild(cell); 
                });
                
                const PCPChangeCell = document.createElement('td');
                PCPChangeCell.className= 'pcpChanger';
                const newButtonEnglish = document.createElement('button');
                newButtonEnglish.textContent = "PCP Change";
                newButtonEnglish.style.backgroundColor = "Azure";
                
                const newButtonSpanish = document.createElement('button');
                newButtonSpanish.textContent = "Cambio de PCP";
                newButtonSpanish.style.backgroundColor = "Coral";
                
                // Add click event for English button
                newButtonEnglish.addEventListener('click', () => {
                    PCPChange(rowData.Name, rowData.NPI, rowData.Location);
                });

                newButtonSpanish.addEventListener('click', () => {
                    PCPChangeEspanol(rowData.Name, rowData.NPI, rowData.Location);
                })

                PCPChangeCell.appendChild(newButtonEnglish);                
                PCPChangeCell.appendChild(newButtonSpanish)
                row.appendChild(PCPChangeCell);
                tbody.appendChild(row);
            });

            providerTableData.appendChild(tbody);
            document.body.appendChild(providerTableData);

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
                    if (cell.textContent === '7734 N 59th Ave Glendale AZ 85301') {
                        hasWest = true;
                        return; 
                    } else if(cell.textContent === '4250 W Baseline Rd Phoenix, AZ 85339'){
                    hasLaveen = true;
                        return;
                    }else if(cell.textContent === '616 E Southern Ave #103,Mesa AZ 85204') {
                        hasMesa = true;
                        return;
                    } else if(cell.textContent === '15235 N Dysart Rd Ste 103, El Mirage, AZ 85335'){
                        hasElMirage = true;
                        return;
                    }else if (cell.textContent === '13402 N 32nd St Phoenix AZ 85032'){
                        hasNorth = true;
                    }else if (cell.textContent === '1533 E Willetta St Phoenix AZ 85006'){
                        hasCentro = true;
                        return;
                    } else if(cell.textContent === '301 E Cottonwood Ln Casa Grande AZ 85122'){
                        hasCasaGrande = true;
                        return;
                    } else if(cell.textContent === '1315 W Southern Ave Tempe, AZ 85282'){
                        hasTempe = true;
                        return;
                    }else if(cell.textContent === "Clinica La Familia"){
                        hasCLF = true;
                        return;
                    }
                });

                if (hasWest) {
                    row.style.backgroundColor = '#D2E0FB'; 
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
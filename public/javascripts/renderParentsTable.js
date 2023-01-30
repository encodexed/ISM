function renderParentsTable(tbl, parents) {

    // Initialising the table elements
    const tblBody = document.createElement('tbody');
    tblBody.className = 'table-group-divider';
    const tblHead = document.createElement('thead');
    tblHead.className = '';
    const tblHeadRow = document.createElement('tr');
    tblHeadRow.className = '';

    // Creating the header row
    const headers = ['Last Name', 'First Name', 'Email', 'Contact', 'Dependents', 'Notes', 'Actions'];
    const cellWidth = ['15%', '15%', '15%', '10%', '15%', '15%', '15%'];
    for (let i = 0; i < headers.length; i++) {
        const cell = document.createElement('th');
        cell.setAttribute('scope', 'col');
        cell.className = 'text-sm font-medium text-gray-900 px-6 py-4 text-left';
        const cellText = document.createTextNode(`${headers[i]}`);
        // cell.setAttribute('style', `width: ${cellWidth[i]}`);
        cell.appendChild(cellText);
        tblHeadRow.appendChild(cell);
    }
    tblHead.appendChild(tblHeadRow);

    // Looping through all of the rows
    for (let parent of parents) {
        const tblRow = document.createElement('tr');
        tblRow.className = 'bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100';

        const cellLast = document.createElement('td');
        cellLast.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        cellLast.innerHTML = `${parent.lastName}`;
        tblRow.appendChild(cellLast);

        const cellFirst = document.createElement('td');
        cellFirst.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        cellFirst.innerHTML = `${parent.firstName}`;
        tblRow.appendChild(cellFirst);

        const cellEmail = document.createElement('td');
        cellEmail.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        cellEmail.innerHTML = `${parent.email}`;
        tblRow.appendChild(cellEmail);

        const cellContact = document.createElement('td');
        cellContact.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        cellContact.innerHTML = `${parent.contactNumber}`;
        tblRow.appendChild(cellContact);

        const cellDependents = document.createElement('td');
        cellDependents.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        studentListHTML = '';
        if (parent.dependents.length === 0) {
            studentListHTML = '-';
        }
        for (let i = 0; i < parent.dependents.length; i++) {
            if (i === 0 ) {
                studentListHTML = `${parent.dependents[0].firstName} ${parent.dependents[0].lastName}`
            } else {
                studentListHTML += `<br>${parent.dependents[i].firstName} ${parent.dependents[i].lastName}`
            }
        }
        cellDependents.innerHTML = studentListHTML;
        tblRow.appendChild(cellDependents);

        const cellNotes = document.createElement('td');
        cellNotes.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        cellNotes.innerHTML = `${parent.notes}`;
        tblRow.appendChild(cellNotes);

        const cellActions = document.createElement('td');
        cellActions.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        cellActions.innerHTML = `<a type="button" class="inline-block px-6 py-2.5 bg-purple-600 text-white 
        font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-800 hover:shadow-lg
        focus:bg-purple-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-900 active:shadow-lg
        transition duration-150 ease-in-out" href="/admin/parent/${parent._id}/edit">Edit</a>`;
        tblRow.appendChild(cellActions);

        tblBody.appendChild(tblRow);
    }
    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);
}
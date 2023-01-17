function renderParentsTable(tbl, parents) {

    // Initialising the table elements
    const tblBody = document.createElement('tbody');
    tblBody.className = 'table-group-divider';
    const tblHead = document.createElement('thead');
    tblHead.className = '';
    const tblHeadRow = document.createElement('tr');
    tblHeadRow.className = '';

    // Creating the header row
    const headers = ['First Name', 'Last Name', 'Email', 'Contact', 'Dependents', 'Notes', 'Actions'];
    const cellWidth = ['15%', '15%', '15%', '10%', '15%', '15%', '15%'];
    for (let i = 0; i < headers.length; i++) {
        const cell = document.createElement('th');
        cell.setAttribute('scope', 'col');
        const cellText = document.createTextNode(`${headers[i]}`);
        cell.setAttribute('style', `width: ${cellWidth[i]}`);
        cell.appendChild(cellText);
        tblHeadRow.appendChild(cell);
    }
    tblHead.appendChild(tblHeadRow);

    // Looping through all of the rows
    for (let parent of parents) {
        const tblRow = document.createElement('tr');

        const cellFirst = document.createElement('td');
        cellFirst.innerHTML = `${parent.firstName}`;
        tblRow.appendChild(cellFirst);

        const cellLast = document.createElement('td');
        cellLast.innerHTML = `${parent.lastName}`;
        tblRow.appendChild(cellLast);

        const cellEmail = document.createElement('td');
        cellEmail.innerHTML = `${parent.email}`;
        tblRow.appendChild(cellEmail);

        const cellContact = document.createElement('td');
        cellContact.innerHTML = `${parent.contactNumber}`;
        tblRow.appendChild(cellContact);

        const cellDependents = document.createElement('td');
        studentListHTML = '';
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
        cellNotes.innerHTML = `${parent.notes}`;
        tblRow.appendChild(cellNotes);

        const cellActions = document.createElement('td');
        cellActions.innerHTML = `<a class="btn btn-sm btn-info" href="/admin/parent/${parent._id}/add_dependents">Dependents</a>
        <a class="btn btn-sm btn-warning" href="/admin/parent/${parent._id}/edit">Edit</a>`;
        tblRow.appendChild(cellActions);

        tblBody.appendChild(tblRow);
    }
    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);
}
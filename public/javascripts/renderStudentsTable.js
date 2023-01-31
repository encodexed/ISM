function renderStudentsTable(tbl, students) {

    // Initialising the table elements
    const tblBody = document.createElement('tbody');
    tblBody.className = 'table-group-divider';
    const tblHead = document.createElement('thead');
    tblHead.className = 'bg-white border-b';
    const tblHeadRow = document.createElement('tr');
    tblHeadRow.className = '';

    // Creating the header row
    const headers = ['Last Name', 'First Name', 'Parent', 'Course', 'Piano', 'Theory', 'Notes', 'DOB', 'Gender', 'Actions'];
    const cellWidth = ['10%', '10%', '15%', '10%', '10%', '10%', '10%', '5%', '5%', '15%'];
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
    for (let student of students) {
        const tblRow = document.createElement('tr');
        tblRow.className = 'bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100';

        const cellLast = document.createElement('td');
        cellLast.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        cellLast.innerHTML = `${student.lastName}`;
        tblRow.appendChild(cellLast);

        const cellFirst = document.createElement('td');
        cellFirst.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        cellFirst.innerHTML = `${student.firstName}`;
        tblRow.appendChild(cellFirst);

        const cellParent = document.createElement('td');
        cellParent.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        if (student.parent === undefined) {
            cellParent.innerHTML = '-';
        } else if (student.parent === null) {
            cellParent.innerHTML = 'DELETED';
        } else {
            cellParent.innerHTML = `${student.parent.firstName}<br>${student.parent.lastName}`;
        }
        tblRow.appendChild(cellParent);

        const cellCourse = document.createElement('td');
        cellCourse.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        if (student.course === undefined) {
            cellCourse.innerHTML = '-';
        } else if (student.course === null) {
            cellCourse.innerHTML = 'DELETED';
        } else {
            cellCourse.innerHTML = `<strong>${student.course.title}</strong><br>${student.course.day}<br>${student.course.time}`;
        }
        tblRow.appendChild(cellCourse);

        const cellPiano = document.createElement('td');
        cellPiano.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        cellPiano.innerHTML = `${student.pianoGrade}`;
        tblRow.appendChild(cellPiano);

        const cellTheory = document.createElement('td');
        cellTheory.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        cellTheory.innerHTML = `${student.theoryGrade}`;
        tblRow.appendChild(cellTheory);

        const cellNotes = document.createElement('td');
        cellNotes.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        cellNotes.innerHTML = `${student.notes}`;
        tblRow.appendChild(cellNotes);

        const cellDOB = document.createElement('td');
        cellDOB.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        cellDOB.innerHTML = `${student.dateOfBirth}`;
        tblRow.appendChild(cellDOB);

        const cellGender = document.createElement('td');
        cellGender.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        cellGender.innerHTML = `${student.gender}`;
        tblRow.appendChild(cellGender);

        const cellActions = document.createElement('td');
        cellActions.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        cellActions.innerHTML = `<a type="button" class="inline-block px-6 py-2.5 bg-purple-600 
        text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-800
        hover:shadow-lg focus:bg-purple-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-900
        active:shadow-lg transition duration-150 ease-in-out" href="/admin/student/${student._id}/edit">Edit</a>`;
        tblRow.appendChild(cellActions);

        tblBody.appendChild(tblRow);
    }
    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);
}
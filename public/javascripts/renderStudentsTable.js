function renderStudentsTable(tbl, students) {

    // Initialising the table elements
    const tblBody = document.createElement('tbody');
    tblBody.className = 'table-group-divider';
    const tblHead = document.createElement('thead');
    tblHead.className = '';
    const tblHeadRow = document.createElement('tr');
    tblHeadRow.className = '';

    // Creating the header row
    const headers = ['First Name', 'Last Name', 'Parent', 'Course', 'Piano', 'Theory', 'Notes', 'DOB', 'Gender', 'Actions'];
    const cellWidth = ['10%', '10%', '15%', '10%', '10%', '10%', '10%', '5%', '5%', '15%'];
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
    for (let student of students) {
        const tblRow = document.createElement('tr');

        const cellFirst = document.createElement('td');
        cellFirst.innerHTML = `${student.firstName}`;
        tblRow.appendChild(cellFirst);

        const cellLast = document.createElement('td');
        cellLast.innerHTML = `${student.lastName}`;
        tblRow.appendChild(cellLast);

        const cellParent = document.createElement('td');
        if (student.parent === undefined) {
            cellParent.innerHTML = '-';
        } else if (student.parent === null) {
            cellParent.innerHTML = 'DELETED';
        } else {
            cellParent.innerHTML = `${student.parent.firstName}`;
        }
        tblRow.appendChild(cellParent);

        const cellCourse = document.createElement('td');
        if (student.course === undefined) {
            cellCourse.innerHTML = '-';
        } else if (student.course === null) {
            cellCourse.innerHTML = 'DELETED';
        } else {
            cellCourse.innerHTML = `<strong>${student.course.title}</strong><br>${student.course.day}<br>${student.course.time}`;
        }
        tblRow.appendChild(cellCourse);

        const cellPiano = document.createElement('td');
        cellPiano.innerHTML = `${student.pianoGrade}`;
        tblRow.appendChild(cellPiano);

        const cellTheory = document.createElement('td');
        cellTheory.innerHTML = `${student.theoryGrade}`;
        tblRow.appendChild(cellTheory);

        const cellNotes = document.createElement('td');
        cellNotes.innerHTML = `${student.notes}`;
        tblRow.appendChild(cellNotes);

        const cellDOB = document.createElement('td');
        cellDOB.innerHTML = `${student.dateOfBirth}`;
        tblRow.appendChild(cellDOB);

        const cellGender = document.createElement('td');
        cellGender.innerHTML = `${student.gender}`;
        tblRow.appendChild(cellGender);

        const cellActions = document.createElement('td');
        cellActions.innerHTML = `<a class="btn btn-sm btn-warning mt-3" href="/admin/student/${student._id}/edit">Edit</a>`;
        tblRow.appendChild(cellActions);

        tblBody.appendChild(tblRow);
    }
    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);
}
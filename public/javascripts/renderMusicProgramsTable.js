function renderMusicProgramsTable(tbl, musicPrograms) {

    // Initialising the table elements
    const tblBody = document.createElement('tbody');
    tblBody.className = 'table-group-divider';
    const tblHead = document.createElement('thead');
    tblHead.className = '';
    const tblHeadRow = document.createElement('tr');
    tblHeadRow.className = '';

    // Creating the header row
    const headers = ['Program', 'Day', 'Time', 'Duration', 'Teacher', 'Room', 'Students', 'Notes', 'Actions'];
    const cellWidth = ['10%', '10%', '10%', '10%', '10%', '5%', '15%', '15%', '15%'];
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
    for (let musicProgram of musicPrograms) {
        const tblRow = document.createElement('tr');

        const cellProgram = document.createElement('td');
        cellProgram.innerHTML = `${musicProgram.title}`;
        tblRow.appendChild(cellProgram);

        const cellDay = document.createElement('td');
        cellDay.innerHTML = `${musicProgram.day}`;
        tblRow.appendChild(cellDay);

        const cellTime = document.createElement('td');
        cellTime.innerHTML = `${musicProgram.time}`;
        tblRow.appendChild(cellTime);

        const cellDuration = document.createElement('td');
        cellDuration.innerHTML = `${musicProgram.duration}`;
        tblRow.appendChild(cellDuration);

        const cellTeacher = document.createElement('td');
        cellTeacher.innerHTML = `${musicProgram.teacher}`;
        tblRow.appendChild(cellTeacher);

        const cellRoom = document.createElement('td');
        cellRoom.innerHTML = `${musicProgram.room}`;
        tblRow.appendChild(cellRoom);

        const cellEnrolled = document.createElement('td');
        studentListHTML = '';
        if (musicProgram.enrolled.length === 0) {
            studentListHTML = '-';
        }
        for (let i = 0; i < musicProgram.enrolled.length; i++) {
            if (i === 0 ) {
                studentListHTML = `${musicProgram.enrolled[0].firstName} ${musicProgram.enrolled[0].lastName}`
            } else {
                studentListHTML += `<br>${musicProgram.enrolled[i].firstName} ${musicProgram.enrolled[i].lastName}`
            }
        }
        cellEnrolled.innerHTML = studentListHTML;
        tblRow.appendChild(cellEnrolled);

        const cellNotes = document.createElement('td');
        cellNotes.innerHTML = `${musicProgram.notes}`;
        tblRow.appendChild(cellNotes);

        const cellActions = document.createElement('td');
        cellActions.innerHTML = `<a class="btn btn-sm btn-info" href="/admin/music_program/${musicProgram._id}/enrol_students">Students</a>
        <a class="btn btn-sm btn-warning" href="/admin/music_program/${musicProgram._id}/edit">Edit</a>`;
        tblRow.appendChild(cellActions);

        tblBody.appendChild(tblRow);
    }
    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);
}
function renderMusicProgramsTable(tbl, musicPrograms) {

    // Initialising the table elements
    const tblBody = document.createElement('tbody');
    tblBody.className = '';
    const tblHead = document.createElement('thead');
    tblHead.className = '';
    const tblHeadRow = document.createElement('tr');
    tblHeadRow.className = '';

    // Creating the header row
    const headers = ['Program', 'Day', 'Time', 'Duration', 'Teacher', 'Room', 'Students', 'Notes', 'Actions'];
    // const cellWidth = ['10%', '10%', '10%', '10%', '10%', '5%', '15%', '15%', '15%'];
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
    for (let musicProgram of musicPrograms) {
        const tblRow = document.createElement('tr');
        tblRow.className = 'bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100';

        const cellProgram = document.createElement('td');
        cellProgram.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        cellProgram.innerHTML = `${musicProgram.title}`;
        tblRow.appendChild(cellProgram);

        const cellDay = document.createElement('td');
        cellDay.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        cellDay.innerHTML = `${musicProgram.day}`;
        tblRow.appendChild(cellDay);

        const cellTime = document.createElement('td');
        cellTime.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        cellTime.innerHTML = `${musicProgram.time}`;
        tblRow.appendChild(cellTime);

        const cellDuration = document.createElement('td');
        cellDuration.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        cellDuration.innerHTML = `${musicProgram.duration}`;
        tblRow.appendChild(cellDuration);

        const cellTeacher = document.createElement('td');
        cellTeacher.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        cellTeacher.innerHTML = `${musicProgram.teacher}`;
        tblRow.appendChild(cellTeacher);

        const cellRoom = document.createElement('td');
        cellRoom.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        cellRoom.innerHTML = `${musicProgram.room}`;
        tblRow.appendChild(cellRoom);

        const cellEnrolled = document.createElement('td');
        cellEnrolled.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
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
        cellNotes.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        cellNotes.innerHTML = `${musicProgram.notes}`;
        tblRow.appendChild(cellNotes);

        const cellActions = document.createElement('td');
        cellActions.className = 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap';
        cellActions.innerHTML = `<a type="button" class="inline-block px-6 py-2.5 bg-purple-600 text-white 
        font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-800 hover:shadow-lg
        focus:bg-purple-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-900 active:shadow-lg
        transition duration-150 ease-in-out" href="/admin/music_program/${musicProgram._id}/edit">Edit</a>`;
        tblRow.appendChild(cellActions);

        tblBody.appendChild(tblRow);
    }
    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);
}
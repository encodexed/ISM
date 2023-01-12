function makeTimetable(tbl, musicPrograms) {

    function makeTimeArray() {
        let time = 900; // 9am start
        let timeString = '900';
        let appendAM = 'am';
        const timeArray = [];

        for (let i = 0; i < 49; i++) {
            // Check if morning or afternoon/evening
            if (time === 1200) {
                appendAM = 'pm';
            }
            if (time === 1300) {
                time = 100;
            }

            // Format time for display and export
            if (timeString.length === 4) {
                timeArray[i] = `${timeString.substring(0, 2)}:${timeString.substring(2, 4)}${appendAM}`;
            } else {
                timeArray[i] = `${timeString.substring(0, 1)}:${timeString.substring(1, 3)}${appendAM}`;
            }

            // Update time for next iteration
            time += 15;
            if (time.toString().endsWith('60') == true) {
                time += 40;
            }
            timeString = time.toString();
        }
        return timeArray;
    }
    const timeArray = makeTimeArray();

    // Initialising the table elements
    const tblBody = document.createElement('tbody');
    tblBody.className = 'table-group-divider';
    const tblHead = document.createElement('thead');
    tblHead.className = '';
    const tblHeadRow = document.createElement('tr');
    tblHeadRow.className = '';

    // Creating the header row
    const daysArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let i = 0; i < daysArray.length + 1; i++) {
        const cell = document.createElement('th');
        cell.setAttribute('scope', 'col');

        let cellText = '';
        if (i !== 0) {
            cellText = document.createTextNode(`${daysArray[i - 1]}`);
            cell.setAttribute('style', 'width: 200px;');
        } else {
            cellText = document.createTextNode('');
            cell.setAttribute('style', 'width: 200px;');
        }
        cell.appendChild(cellText);
        tblHeadRow.appendChild(cell);
    }
    tblHead.appendChild(tblHeadRow);

    // Initialising the cells and appending onto table

    // Looping through all of the rows
    for (let row = 0; row < timeArray.length; row++) {
        const tblRow = document.createElement('tr');

        for (let col = 0; col < daysArray.length + 1; col++) {
            if (col === 0) {
                // Setting the first column to display the time each row
                const cell = document.createElement('th');
                cell.setAttribute('scope', 'row');
                cell.innerHTML = `${timeArray[row]}`;
                tblRow.appendChild(cell);
            } else {
                // Displaying programs if they exist, otherwise left empty
                const cell = document.createElement('td');
                for (let musicProgram of musicPrograms) {
                    if (musicProgram.day === daysArray[col - 1]) {
                        if (musicProgram.time === timeArray[row]) {
                            cell.innerHTML = `
                                <p><strong>${musicProgram.title}</strong><br>
                                Teacher: ${musicProgram.teacher}<br>
                                Duration: ${musicProgram.duration}</p>`;
                        }
                    }
                }
                tblRow.appendChild(cell);
            }
        }
        tblBody.appendChild(tblRow);
    }
    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);
}
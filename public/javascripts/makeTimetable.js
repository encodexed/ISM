function makeTimetable(tbl, musicPrograms) {

    function makeTimeArray(musicPrograms) {
        
        // Get times for all programs
        const getTimes = new Array(musicPrograms.length);
        for (let i = 0; i < musicPrograms.length; i++) {
            getTimes[i] = musicPrograms[i].time;
        }

        // Check and delete duplicates
        const trimmedTimeArray = [];
        let index = 0;
        for (let i = 0; i < getTimes.length - 1; i++) {
            if (getTimes[i] !== getTimes[i + 1]) {
                trimmedTimeArray[index] = getTimes[i];
                index++;
            }
        }

        // Sort into new array
        const sortedArray = [];

        for (let time of trimmedTimeArray) {
            if (time.length === 6 && time.endsWith('am')) {
                sortedArray.push(time);
            }
        }

        for (let time of trimmedTimeArray) {
            if (time.length === 7 && time.endsWith('am')) {
                sortedArray.push(time);
            }
        }

        for (let time of trimmedTimeArray) {
            if (time.length === 7 && time.endsWith('pm') && time.startsWith('12')) {
                sortedArray.push(time);
            }
        }

        for (let time of trimmedTimeArray) {
            if (time.length === 6 && time.endsWith('pm')) {
                sortedArray.push(time);
            }
        }

        return sortedArray;
    }

    const timeArray = makeTimeArray(musicPrograms);
    console.log(timeArray);

    // Initialising the table elements
    const tblBody = document.createElement('tbody');
    tblBody.className = 'table-group-divider';
    const tblHead = document.createElement('thead');
    tblHead.className = '';
    const tblHeadRow = document.createElement('tr');
    tblHeadRow.className = '';

    // Creating the header row
    const daysArray = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let i = 0; i < daysArray.length; i++) {
        const cell = document.createElement('th');
        cell.setAttribute('scope', 'col');
        const cellText = document.createTextNode(`${daysArray[i]}`);
        cell.setAttribute('style', 'width: 200px;');
        cell.appendChild(cellText);
        tblHeadRow.appendChild(cell);
    }
    tblHead.appendChild(tblHeadRow);

    // Initialising the cells and appending onto table

    // Looping through all of the rows
    for (let row = 0; row < timeArray.length; row++) {
        const tblRow = document.createElement('tr');

        for (let col = 0; col < daysArray.length; col++) {
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
                    if (musicProgram.day === daysArray[col]) {
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
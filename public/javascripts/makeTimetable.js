function makeTimetable(tbl, musicPrograms) {

    function makeTimeArray(musicPrograms) {
        
        // Get times for all programs
        const getTimes = new Array(musicPrograms.length);
        for (let i = 0; i < musicPrograms.length; i++) {
            getTimes[i] = musicPrograms[i].time;
        }

        // Check and delete duplicates
        const removedDuplicatesArray = [];
        let index = 0;
        for (let i = 0; i < getTimes.length - 1; i++) {
            if (getTimes[i] !== getTimes[i + 1]) {
                removedDuplicatesArray[index] = getTimes[i];
                index++;
            }
        }

        // Sort into new array
        const sortedArray = [];

        for (let time of removedDuplicatesArray) {
            if (time.endsWith('AM')) {
                sortedArray.push(time);
            }
        }

        for (let time of removedDuplicatesArray) {
            if (time.endsWith('PM')) {
                sortedArray.push(time);
            }
        }

        // Remove zeroes from time strings
        // for (let i = 0; i < sortedArray.length; i++) {
        //     if (sortedArray[i].startsWith('0')) {
        //         sortedArray[i] = sortedArray[i].substring(1);
        //     }
        // }
        
        return sortedArray;
    }

    const timeArray = makeTimeArray(musicPrograms);

    // Initialising the table elements
    const tblBody = document.createElement('tbody');
    tblBody.className = '';
    const tblHead = document.createElement('thead');
    tblHead.className = '';
    const tblHeadRow = document.createElement('tr');
    tblHeadRow.className = '';

    // Creating the header row
    const daysArray = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let i = 0; i < daysArray.length; i++) {
        const cell = document.createElement('th');
        cell.className = 'text-xl py-2 bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100';
        cell.setAttribute('scope', 'col');
        const cellText = document.createTextNode(`${daysArray[i]}`);
        cell.setAttribute('style', 'width: 200px;'); // This might be better with .classList and CSS.
        cell.appendChild(cellText);
        tblHeadRow.appendChild(cell);
    }
    tblHead.appendChild(tblHeadRow);

    // Initialising the cells and appending onto table

    // Looping through all of the rows
    for (let row = 0; row < timeArray.length; row++) {
        const tblRow = document.createElement('tr');
        tblRow.className = 'bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100';

        for (let col = 0; col < daysArray.length; col++) {
            if (col === 0) {
                // Setting the first column to display the time each row
                const cell = document.createElement('th');
                cell.className = 'text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap';
                cell.innerHTML = `${timeArray[row]}`;
                tblRow.appendChild(cell);
            } else {
                // Displaying programs if they exist, otherwise left empty
                const cell = document.createElement('td');
                cell.className = 'text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap';
                for (let musicProgram of musicPrograms) {
                    if (musicProgram.day === daysArray[col]) {
                        if (musicProgram.time === timeArray[row]) {
                            cell.innerHTML = `
                                <p> <a href="/admin/music_program/${musicProgram._id}/edit" 
                                class="font-semibold underline text-blue-500">${musicProgram.title}</a><br>
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
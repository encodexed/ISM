function renderPublicTimetable(section, musicPrograms) {

    // Creating the timetable frame
    const timetable = document.createElement('div');
    timetable.className = 'overflow-scroll p-6 mx-4 lg:mx-auto bg-white overflow-hidden rounded-xl shadow-xl grid grid-cols-[100px,repeat(6,150px)] grid-rows-[auto,repeat(49,60px)] max-w-[1050px]';

    // Creating the headers
    const days = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    for (let i = 0; i < days.length; i++) {
        const header = document.createElement('div');
        header.className = `row-start-[1] col-start-[${i + 1}] sticky top-0 z-10 bg-white border-b text-sm font-medium py-2 text-center`;
        header.innerHTML = days[i];
        timetable.appendChild(header);
    }

    // Creating the times rows
    const times = [
        '09:00 AM', '09:15 AM', '09:30 AM', '09:45 AM', '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM', '11:00 AM',
        '11:15 AM', '11:30 AM', '11:45 AM', '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM', '01:00 PM',
        '01:15 PM', '01:30 PM', '01:45 PM', '02:00 PM', '02:15 PM', '02:30 PM', '02:45 PM', '03:00 PM',
        '03:15 PM', '03:30 PM', '03:45 PM', '04:00 PM', '04:15 PM', '04:30 PM', '04:45 PM', '05:00 PM',
        '05:15 PM', '05:30 PM', '05:45 PM', '06:00 PM', '06:15 PM', '06:30 PM', '06:45 PM', '07:00 PM',
        '07:15 PM', '07:30 PM', '07:45 PM', '08:00 PM', '08:15 PM', '08:30 PM', '08:45 PM', '09:00 PM'
    ];

    for (let i = 0; i < times.length; i++) {
        const header = document.createElement('div');
        header.className = `row-start-[${i + 2}] col-start-[1] border-slate-100 border-x text-xs p-1.5 text-right text-slate-400 uppercase sticky left-0 bg-white font-medium`;
        header.innerHTML = times[i];
        if (i === times.length - 1) {
            header.classList.add('border-b');
        }
        timetable.appendChild(header);
    }

    // Adding space for events to be put.
    for (let i = 0; i < times.length; i++) {
        for (let j = 1; j < days.length; j++) {
            const cell = document.createElement('div');
            cell.className = `row-start-[${i + 2}] col-start-[${j + 1}] border-slate-100 border-b border-r`;
            timetable.appendChild(cell);
        }
    }

    // Creating timetable contents
    for (let musicProgram of musicPrograms) {
        for (let i = 0; i < times.length; i++) {
            if (musicProgram.time === times[i]) {
                for (let j = 1; j < days.length; j++) {
                    if (musicProgram.day === days[j]) {
                        const program = document.createElement('div');
                        program.className = `row-start-[${i + 2}] col-start-[${j + 1}] rounded-lg m-1 p-1 flex flex-col bg-white`;

                        // Determine colour theme of program
                        let link = '/ism/jitterbugs';
                        switch (musicProgram.title) {
                            case 'Jitterbugs':
                                link = '/ism/jitterbugs';
                                break;
                            case 'Beeboppers':
                                link = '/ism/beeboppers';
                                break;
                            case 'Pianorama Juniors':
                                link = '/ism/pianorama_juniors';
                                break;
                            case 'Pianorama Primary':
                                link = '/ism/pianorama_primary';
                                break;
                            default:
                                link = '/ism/lessons_overview';
                        }

                        program.classList.add('shadow-md', `shadow-slate-600`, 'border', 'border-2', `border-slate-300`);

                        // Calculating row-span based on program duration
                        const programDuration = musicProgram.duration / 15;
                        program.classList.add(`row-span-${programDuration}`);

                        // Displaying program information
                        let capacityColour = 'red';
                        let hiddenButton = '';
                        const spotsLeft = musicProgram.maxCapacity - musicProgram.enrolled.length;
                        if (spotsLeft > 3) {
                            capacityColour = 'blue'
                        } else if (spotsLeft <= 3 && spotsLeft >= 1 ) {
                            capacityColour = 'yellow'
                        } else {
                            hiddenButton = ' hidden';
                        }

                        program.innerHTML = `
                            <span class="text-sm text-center font-semibold text-slate-800">${musicProgram.title}</span>
                            <span class="text-xs text-center text-slate-600">${musicProgram.time} - ${times[i + programDuration]}</span>
                            <span class="mt-auto mx-auto text-center">
                                <span class="text-xs font-semibold text-${capacityColour}-600">Available spots: ${spotsLeft}</span>
                                <a href="/ism/enrol/${musicProgram._id}" type="button" class="mb-0.5 inline-block px-3 py-0.5 bg-blue-600 text-white font-medium text-xs 
                                leading-tight uppercase rounded-full hover:cursor-pointer shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
                                focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out${hiddenButton}">Book</a>
                                <a href="${link}" type="button" class="mt-1 mb-0.5 inline-block px-3 py-0.5 bg-yellow-300 font-medium text-xs text-gray-700
                                leading-tight uppercase rounded-full hover:cursor-pointer shadow-md hover:bg-yellow-400 hover:shadow-lg focus:bg-yellow-400
                                focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-500 active:shadow-lg transition duration-150 ease-in-out">Info</a>
                            </span>
                        `
                        timetable.appendChild(program);
                    }
                }
            }
        }
    }
    // Exporting the timetable into the document
    section.appendChild(timetable);
}
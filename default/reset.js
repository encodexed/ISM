const mongoose = require('mongoose');
const programs = require('./programs');
const port = 3000;
const MusicProgram = require('../models/musicProgram');
const Parent = require('../models/parent');
const Student = require('../models/student');
const Enquiry = require('../models/enquiry');

mongoose.connect(`mongodb://localhost:27017/ism-leichhardt`, {
    useNewURLParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const programsCount = Object.keys(programs).length; // Number of programs in json file

const resetAll = async () => {

    // Resetting music programs

    await MusicProgram.deleteMany();

    for (let i = 0; i < programsCount; i++) {
        const program = new MusicProgram({
            title: `${programs[i].title}`,
            day: `${programs[i].day}`,
            time: `${programs[i].time}`,
            duration: `${programs[i].duration}`,
            teacher: `${programs[i].teacher}`,
            room: `${programs[i].room}`,
            enrolled: [],
            notes: `${programs[i].notes}`
        })
        await program.save();
    }

    // Resetting parents

    await Parent.deleteMany();

    const parent1 = new Parent({
        firstName: 'Adam',
        lastName: 'West',
        email: 'adamwest65@gmail.com',
        contactNumber: '0492042864',
        notes: ''
    })
    await parent1.save();

    const parent2 = new Parent({
        firstName: 'Sophie',
        lastName: 'Belatruse',
        email: 'lilsophsoph59@hotmail.com',
        contactNumber: '0429750138',
        notes: 'Doesn\'t pay her dues to the guild on time'
    })
    await parent2.save();

    const parent3 = new Parent({
        firstName: 'Victoria',
        lastName: 'Better',
        email: 'tastesgarbage@yahoo.com.au',
        contactNumber: '95592038',
        notes: 'Wants a Monday afternoon lesson time if possible for her son'
    })
    await parent3.save();

    // Resetting students

    await Student.deleteMany();

    const student1 = new Student({
        firstName: 'Penelope',
        lastName: 'Chan',
        pianoGrade: '8th grade comprehensive',
        theoryGrade: 'none',
        dateOfBirth: '2010-05-23',
        gender: 'Female',
        notes: 'Must be scheduled on the same day as her sisters'
    })
    await student1.save();

    const student2 = new Student({
        firstName: 'Felicity',
        lastName: 'Chan',
        pianoGrade: 'none',
        theoryGrade: 'none',
        dateOfBirth: '2003-11-23',
        gender: 'Female',
        notes: 'Must be scheduled on the same day as her sisters'
    })
    await student2.save();

    const student3 = new Student({
        firstName: 'Adem',
        lastName: 'Oksuz',
        pianoGrade: '3rd grade piano for leisure',
        theoryGrade: 'none',
        dateOfBirth: '1999-09-16',
        gender: 'Male',
        notes: 'Must be scheduled on the same day as her sisters'
    })
    await student3.save();

    const student4 = new Student({
        firstName: 'Mia',
        lastName: 'Flunt',
        pianoGrade: '3rd grade comprehensive',
        theoryGrade: 'none',
        dateOfBirth: '2004-10-04',
        gender: 'Female',
        notes: 'Must be scheduled on the same day as her sisters'
    })
    await student4.save();

    const student5 = new Student({
        firstName: 'James',
        lastName: 'Fang',
        pianoGrade: 'none',
        theoryGrade: 'none',
        dateOfBirth: '2002-05-24',
        gender: 'Male',
        notes: 'Must be scheduled on the same day as her sisters'
    })
    await student5.save();

    // Resetting enquiries

    await Enquiry.deleteMany();

    const enquiry1 = new Enquiry({
        submittedFrom: 'Seeded',
        parentFirstName: 'Julia',
        parentLastName: 'Hallefax',
        email: 'juliaisneedy53@hotmail.com',
        contactNumber: '0408984521',
        studentFirstName: 'Samantha',
        studentLastName: 'Hallefax',
        dateOfBirth: '2014-07-28',
        gender: 'Female',
        notes: 'Hi there, I was just wondering if it would be possible to get a discount on your fine services. I am poor and have to pay for surgery on my knee soon.',
        desiredMusicProgram: 'Pianorama Junior',
        preferredTime: 'Wednesday 9:45am'
    })
    await enquiry1.save();
}

// Calling the reset

resetAll().then(() => {
    console.log('Reset complete.')
    mongoose.connection.close();
})

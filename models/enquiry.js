const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnquirySchema = new Schema({
    submittedFrom: {
        type: String,
        enum: ['Seeded', 'Enrolment', 'Enquiry']
    },
    // Parent
    parentFirstName: String,
    parentLastName: String,
    email: String,
    contactNumber: String,
    // Student
    studentFirstName: String,
    studentLastName: String,
    dateOfBirth: String,
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'Unsure']
    },
    notes: String,
    // Music Program
    desiredMusicProgram: String,
    preferredTime: String
})

EnquirySchema.virtual('formattedDOB').get(function () {
    const dobArray = this.dateOfBirth.split('-');
    return `${dobArray[2]}/${dobArray[1]}/${dobArray[0]}`;
})

module.exports = mongoose.model('Enquiry', EnquirySchema);
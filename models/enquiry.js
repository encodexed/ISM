const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnquirySchema = new Schema({
    // Parent
    parentFirstName: String,
    parentLastName: String,
    email: String,
    contactNumber: String,
    // Student
    studentFirstName: String,
    studentLastName: String,
    dataOfBirth: String,
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'Unsure']
    },
    notes: String,
    // Music Program
    desiredMusicProgram: String,
    preferredTime: String
})

module.exports = mongoose.model('Enquiry', EnquirySchema);
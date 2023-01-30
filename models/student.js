const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    firstName: String,
    lastName: String,
    course: { type: Schema.Types.ObjectID, ref: 'MusicProgram'},
    pianoGrade: String,
    theoryGrade: String,
    dateOfBirth: String,
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'Unsure']
    },
    notes: String,
    parent: { type: Schema.Types.ObjectID, ref: 'Parent' }
})

// StudentSchema.virtual('formattedDOB').get(function () {
//     const dobArray = this.dateOfBirth.split('-');
//     return `${dobArray[2]}/${dobArray[1]}/${dobArray[0]}`;
// })

StudentSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
})

module.exports = mongoose.model('Student', StudentSchema);
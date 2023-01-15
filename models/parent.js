const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParentSchema = new Schema({
    firstName: String,
    lastName: String,
    dependents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        }
    ],
    email: String,
    contactNumber: String,
    notes: String
})

module.exports = mongoose.model('Parent', ParentSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnquirySchema = new Schema({
    // parentName: String,
    // email: String,
    // contactNumber: String,
    // studentName: String,
    // dataOfBirth: String,
    // gender: {
    //     type: String,
    //     enum: ['male', 'female', 'other']
    // },
    // notes: String
})

module.exports = mongoose.model('Enquiry', EnquirySchema);
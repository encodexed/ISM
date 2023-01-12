const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MusicProgramSchema = new Schema({
    title: String,
    day: String,
    time: String,
    duration: String,
    teacher: String,
    room: String,
    enrolled: [{ type: Schema.Types.ObjectID, ref: 'Student'}],
    notes: String
})

module.exports = mongoose.model('MusicProgram', MusicProgramSchema);
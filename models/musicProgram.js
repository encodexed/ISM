const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MusicProgramSchema = new Schema({
    title: String,
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    time: String,
    duration: String,
    teacher: String,
    room: String,
    enrolled: [{ type: Schema.Types.ObjectID, ref: 'Student'}],
    notes: String
})

module.exports = mongoose.model('MusicProgram', MusicProgramSchema);
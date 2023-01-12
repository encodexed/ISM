const Parent = require('../models/parent');
const Student = require('../models/student');

module.exports.renderTimetable = (req, res) => {
    res.render('programs/timetable');
}

module.exports.renderEnrolment = (req, res) => {
    res.render('programs/enrolment');
}

module.exports.renderEnquiries = (req, res) => {
    res.render('programs/enquiries');
}

module.exports.renderInfo = (req, res) => {
    res.render('programs/info');
}

module.exports.enrol = async (req, res) => {
    const parent = new Parent(req.body.parent);
    parent.notes = 'none';
    await parent.save();

    const student = new Student(req.body.student);
    student.course = 'none';
    student.day = 'none';
    student.time = 'none';
    await student.save();

    res.redirect('/programs/success');
}

module.exports.renderSuccess = (req, res) => {
    res.render('programs/success');
}
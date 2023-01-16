const Parent = require('../models/parent');
const Student = require('../models/student');
const Enquiry = require('../models/enquiry');

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

module.exports.createEnquiry = async (req, res) => {
    const enquiry = new Enquiry(req.body.enquiry);
    enquiry.submittedFrom = 'Enrolment';
    await enquiry.save();

    res.redirect('/programs/success');
}

module.exports.renderSuccess = (req, res) => {
    res.render('programs/success');
}
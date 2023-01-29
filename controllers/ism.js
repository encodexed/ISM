const Parent = require('../models/parent');
const Student = require('../models/student');
const Enquiry = require('../models/enquiry');

module.exports.renderAboutUs = (req, res) => {
    res.render('ism/about_us');
}

module.exports.renderBeeboppers = (req, res) => {
    res.render('ism/beeboppers');
}

module.exports.renderContactUs = (req, res) => {
    res.render('ism/contact_us');
}

module.exports.renderCovid19Policies = (req, res) => {
    res.render('ism/covid_19_policies');
}

module.exports.renderCreativeKids = (req, res) => {
    res.render('ism/creative_kids')
}

module.exports.renderEnrolment = (req, res) => {
    res.render('ism/enrolment');
}

// Needs a fix.
module.exports.createEnquiry = (req, res) => {
    res.send(body);
}

module.exports.renderFAQ = (req, res) => {
    res.render('ism/faq');
}

module.exports.renderGallery = (req, res) => {
    res.render('ism/gallery');
}

module.exports.renderIndividualLessons = (req, res) => {
    res.render('ism/individual_lessons');
}

module.exports.renderJitterbugs = (req, res) => {
    res.render('ism/jitterbugs');
}

module.exports.renderJobs = (req, res) => {
    res.render('ism/jobs');
}

module.exports.renderLessonsOverview = (req, res) => {
    res.render('ism/lessons_overview');
}

module.exports.renderPianoramaJunior = (req, res) => {
    res.render('ism/pianorama_junior');
}

module.exports.renderPianoramaPrimary = (req, res) => {
    res.render('ism/pianorama_primary');
}

module.exports.renderStaff = (req, res) => {
    res.render('ism/staff');
}

module.exports.renderSuccess = (req, res) => {
    res.render('ism/success');
}
const express = require('express');
const router = express.Router();
const ism = require('../controllers/ism');

router.route('/about_us')
    .get(ism.renderAboutUs);

router.route('/beeboppers')
    .get(ism.renderBeeboppers);

router.route('/contact_us')
    .get(ism.renderContactUs);

router.route('/covid_19_policies')
    .get(ism.renderCovid19Policies);

router.route('/creative_kids')
    .get(ism.renderCreativeKids);

router.route('/enrol/:id')
    .get(ism.renderEnrolment);

router.route('/enrolment')
    .post(ism.createEnquiry);

router.route('/faq')
    .get(ism.renderFAQ);

router.route('/gallery')
    .get(ism.renderGallery);

router.route('/individual_lessons')
    .get(ism.renderIndividualLessons);

router.route('/jitterbugs')
    .get(ism.renderJitterbugs);

router.route('/jobs')
    .get(ism.renderJobs);

router.route('/lessons_overview')
    .get(ism.renderLessonsOverview);

router.route('/pianorama_juniors')
    .get(ism.renderPianoramaJuniors);

router.route('/pianorama_primary')
    .get(ism.renderPianoramaPrimary);

router.route('/staff')
.get(ism.renderStaff);
    
router.route('/success')
    .get(ism.renderSuccess);

router.route('/timetable')
    .get(ism.renderTimetable);
    
module.exports = router;
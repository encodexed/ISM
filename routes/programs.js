const express = require('express');
const router = express.Router();
const programs = require('../controllers/programs');

router.route('/timetable')
    .get(programs.renderTimetable);

router.route('/enrolment')
    .get(programs.renderEnrolment)
    .post(programs.createEnquiry);

router.route('/enquiries')
    .get(programs.renderEnquiries);

router.route('/info')
    .get(programs.renderInfo);

router.route('/success')
    .get(programs.renderSuccess);
    
module.exports = router;
const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin');

router.route('/login')
    .get(admin.renderAdminLogin);

router.route('/timetable')
    .get(admin.renderAdminTimetable);

// Enquiries

router.route('/enquiries')
    .get(admin.renderAdminEnquiries)

router.route('/enquiries/:id/createNewEntries')
    .post(admin.createParentStudentFromEnquiry);

router.route('/enquiries/:id/clear_enquiry')
    .delete(admin.clearEnquiry);



// Music programs

router.route('/music_program/index')
    .get(admin.renderMusicProgramIndex);

router.route('/music_program/add_program')
    .get(admin.renderAddProgram)
    .post(admin.createProgram);

router.route('/music_program/:id')
    .delete(admin.deleteMusicProgram)
    .put(admin.updateMusicProgram);

router.route('/music_program/:id/edit')
    .get(admin.renderEditMusicProgram);

router.route('/music_program/:id/enrol_students')
    .put(admin.enrolStudent);

router.route('/music_program/:id/unenrol_student/:student_id')
    .put(admin.unenrolStudent);

// Parents

router.route('/parent/index')
    .get(admin.renderParentIndex);

router.route('/parent/add_parent')
    .get(admin.renderAddParent)
    .post(admin.createParent);

router.route('/parent/:id')
    .delete(admin.deleteParent)
    .put(admin.updateParent);

router.route('/parent/:id/edit')
    .get(admin.renderEditParent);

router.route('/parent/:id/add_dependents')
    .put(admin.addDependentToParent);

router.route('/parent/:id/remove_dependents/:student_id')
    .put(admin.removeDependentFromParent);

// Students

router.route('/student/index')
    .get(admin.renderStudentIndex);

router.route('/student/add_student')
    .get(admin.renderAddStudent)
    .post(admin.createStudent);

router.route('/student/:id')
    .delete(admin.deleteStudent)
    .put(admin.updateStudent);

router.route('/student/:id/edit')
    .get(admin.renderEditStudent);

module.exports = router;
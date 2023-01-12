const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin');

router.route('/login')
    .get(admin.renderAdminLogin);

router.route('/index')
    .get(admin.renderAdminIndex);

router.route('/timetable')
    .get(admin.renderAdminTimetable);

router.route('/enquiries')
    .get(admin.renderAdminEnquiries);

// Music programs

router.route('/music_program/add_program')
    .get(admin.renderAddProgram)
    .post(admin.createProgram);

router.route('/music_program/:id')
    .delete(admin.deleteMusicProgram)
    .put(admin.updateMusicProgram);

router.route('/music_program/:id/edit')
    .get(admin.renderEditMusicProgram);

router.route('/music_program/:id/manage_students')
    .get(admin.renderManageStudents)
    .put(admin.enrolStudent);

router.route('/music_program/:id/unenrol_student')
    .put(admin.unenrolStudent);

// Parents

router.route('/parent/add_parent')
    .get(admin.renderAddParent)
    .post(admin.createParent);

router.route('/parent/:id')
    .delete(admin.deleteParent)
    .put(admin.updateParent);

router.route('/parent/:id/edit')
    .get(admin.renderEditParent);

// Students

router.route('/student/add_student')
    .get(admin.renderAddStudent)
    .post(admin.createStudent);

router.route('/student/:id')
    .delete(admin.deleteStudent)
    .put(admin.updateStudent);

router.route('/student/:id/edit')
    .get(admin.renderEditStudent);

module.exports = router;
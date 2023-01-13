const MusicProgram = require('../models/musicProgram');
const Parent = require('../models/parent');
const Student = require('../models/student');

module.exports.renderAdminLogin = (req, res) => {
    res.render('admin/login');
}

module.exports.renderAdminIndex = async (req, res) => {
    const musicPrograms = await MusicProgram.find({}).populate('enrolled', 'firstName lastName');
    const parents = await Parent.find({});
    const students = await Student.find({}).populate('course', 'title day time');
    res.render('admin/index', { musicPrograms, parents, students });
}

module.exports.renderAdminTimetable = async (req, res) => {
    const musicPrograms = await MusicProgram.find({});
    res.render('admin/timetable', { musicPrograms });
}

module.exports.renderAdminEnquiries = (req, res) => {
    res.render('admin/enquiries');
}

// Music Programs

module.exports.renderAddProgram = (req, res) => {
    res.render('admin/music_program/add_program');
}

module.exports.createProgram = async (req, res) => {
    const program = new MusicProgram(req.body.musicProgram);
    await program.save();
    req.flash('success', 'Successfully added a new music program');
    res.redirect('/admin/index');
}

module.exports.deleteMusicProgram = async (req, res) => {
    const musicProgram = await MusicProgram.findByIdAndDelete(req.params.id);
    req.flash('success', `Successfully deleted entry for ${musicProgram.title}, 
        ${musicProgram.day} ${musicProgram.time}`);
    res.redirect('/admin/index');
}

module.exports.updateMusicProgram = async (req, res) => {
    const { id } = req.params;
    const musicProgram = await MusicProgram.findByIdAndUpdate(id, { ...req.body.musicProgram });
    await musicProgram.save();
    req.flash('success', `Successfully updated entry for ${musicProgram.title}, 
        ${musicProgram.day} ${musicProgram.time}`);
    res.redirect('/admin/index');
}

module.exports.renderEditMusicProgram = async (req, res) => {
    const musicProgram = await MusicProgram.findById(req.params.id);
    if(!musicProgram){
        req.flash('error', 'Music Program not found.');
        res.redirect('/admin/index');
    }
    res.render('admin/music_program/edit', { musicProgram });
}

module.exports.renderManageStudents = async (req, res) => {
    const musicProgram = await MusicProgram.findById(req.params.id).populate('enrolled');
    const students = await Student.find({});
    if(!musicProgram){
        req.flash('error', 'Music Program not found.');
        res.redirect('/admin/index');
    }
    res.render('admin/music_program/manage_students', { musicProgram, students });
}

module.exports.enrolStudent = async (req, res) => {
    const { id } = req.params;
    const musicProgram = await MusicProgram.findById(id);
    if(!musicProgram){
        req.flash('error', 'Music Program not found.');
        return res.redirect('/admin/index');
    }
    const { firstName, lastName } = req.body.student;
    const students = await Student.find({ lastName: `${lastName}` });
    let student = {};
    let studentFound = false;
    if (students.length === 0) {
        req.flash('error', 'Student not found.');
        return res.redirect(`/admin/music_program/${musicProgram._id}/manage_students`);
    } else if (students.length === 1) {
        student = students[0];
        studentFound = true;
    } else {
        for (let i = 0; i < students.length; i++) {
            if (students[i].firstName === firstName) {
                student = students[i];
                studentFound = true;
                break;
            }
        }
    }
    if (!studentFound) {
        req.flash('error', 'Student not found.');
        return res.redirect(`/admin/music_program/${musicProgram._id}/manage_students`);
    }
    student.course = musicProgram;
    await student.save();
    musicProgram.enrolled.push(student);
    await musicProgram.save();
    req.flash('success', `Successfully enrolled ${firstName} ${lastName} 
        in ${musicProgram.title}, ${musicProgram.day} ${musicProgram.time}`);
    res.redirect(`/admin/music_program/${musicProgram._id}/manage_students`);
}

module.exports.unenrolStudent = async (req, res) => {

    const { id } = req.params;
    const { firstName, lastName } = req.body.student;
    const family = await Student.find({ lastName: `${lastName}` });
    let student = {};
    let studentFound = false;

    if (family.length === 0) {
        req.flash('error', 'Student not found.');
        return res.redirect(`/admin/music_program/${id}/manage_students`);
    } else {
        for (let i = 0; i < family.length; i++) {
            if (family[i].firstName === firstName) {
                student = family[i];
                studentFound = true;
                break;
            }
        }
    }
    if (!studentFound) {
        req.flash('error', 'Student not found.');
        return res.redirect(`/admin/music_program/${id}/manage_students`);
    }

    student.course = undefined;
    await student.save();
    await MusicProgram.findByIdAndUpdate(id, { $pull: { enrolled: student._id } });
    req.flash('success', `Successfully removed ${firstName} ${lastName}`)
    res.redirect(`/admin/music_program/${id}/manage_students`);
}

// Parents

module.exports.renderAddParent = (req, res) => {
    res.render('admin/parent/add_parent');
}

module.exports.createParent = async (req, res) => {
    const parent = new Parent(req.body.parent);
    await parent.save();
    req.flash('success', 'Successfully added a new parent');
    res.redirect('/admin/index');
}

module.exports.deleteParent = async (req, res) => {
    const parent = await Parent.findByIdAndDelete(req.params.id);
    req.flash('success', `Successfully deleted a parent entry for ${parent.firstName} 
        ${parent.lastName}: ${parent.email}, ${parent.contactNumber}`);
    res.redirect('/admin/index');
}

module.exports.updateParent = async (req, res) => {
    const { id } = req.params;
    const parent = await Parent.findByIdAndUpdate(id, { ...req.body.parent });
    await parent.save();
    req.flash('success', `Successfully updated a parent entry for ${parent.firstName} 
        ${parent.lastName}: ${parent.email}, ${parent.contactNumber}`);
    res.redirect('/admin/index');
}

module.exports.renderEditParent = async (req, res) => {
    const parent = await Parent.findById(req.params.id);
    if(!parent){
        req.flash('error', 'Parent not found.');
        res.redirect('/admin/index');
    }
    res.render('admin/parent/edit', { parent });
}

module.exports.renderManageDependents = async (req, res) => {
    const parent = await Parent.findById(req.params.id);
    res.render('admin/parent/manage_dependents');
}

// Students

module.exports.renderAddStudent = (req, res) => {
    res.render('admin/student/add_student');
}

module.exports.createStudent = async (req, res) => {
    const student = new Student(req.body.student);
    await student.save();
    req.flash('success', 'Successfully added a new student');
    res.redirect('/admin/index');
}

module.exports.deleteStudent = async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id);
    req.flash('success', `Successfully deleted a student entry for ${student.firstName} ${student.lastName}`);
    res.redirect('/admin/index');
}

module.exports.updateStudent = async (req, res) => {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, { ...req.body.student });
    await student.save();
    req.flash('success', `Successfully updated a student entry for ${student.firstName} ${student.lastName}`);
    res.redirect('/admin/index');
}

module.exports.renderEditStudent = async (req, res) => {
    const student = await Student.findById(req.params.id);
    if(!student){
        req.flash('error', 'Student not found.');
        res.redirect('/admin/index');
    }
    res.render('admin/student/edit', { student });
}


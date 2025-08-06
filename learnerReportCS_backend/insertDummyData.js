// Script to insert dummy data for all models in the database
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

// Import all models
const Admin = require('./models/admin.model');
const Attendance = require('./models/attendance.model');
const BatchRegistration = require('./models/batchRegistration.model');
const { careerService } = require('./models/careerService.model');
const Faculty = require('./models/faculty.model');
const QuestionUpload = require('./models/questionUpload.model');
const Student = require('./models/student.model');

async function insertDummyData() {
  await mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  // Admin
  await Admin.deleteMany({}); // Clear all existing admin records
  await Admin.create([
    { username: 'admin1', email: 'admin1@example.com', password: '462e2076f43fd022d4a83de32da9bba9d37330975b8b88a751cc374f6a8afa43' },
    { username: 'admin2', email: 'admin2@example.com', password: '869faf06a22b24b1746720cf2a7cb73264d4deece8b7c14c608b6a45fbf12aca' }
  ]);

  // Attendance
  await Attendance.create([
    { studentId: 'student1', date: new Date(), status: 'Present' },
    { studentId: 'student2', date: new Date(), status: 'Absent' }
  ]);

  // BatchRegistration
  await BatchRegistration.create([
    { batchName: 'Batch A', year: 2025 },
    { batchName: 'Batch B', year: 2025 }
  ]);

  // CareerService
  await careerService.create([
    { username: 'csuser1', email: 'cs1@example.com', fullname: 'Career Service 1', phoneNo: '1234567890', password: 'dummyhash1' },
    { username: 'csuser2', email: 'cs2@example.com', fullname: 'Career Service 2', phoneNo: '0987654321', password: 'dummyhash2' }
  ]);

  // Faculty
  await Faculty.create([
    { name: 'Dr. Smith', email: 'smith@univ.edu', department: 'CS' },
    { name: 'Dr. Jane', email: 'jane@univ.edu', department: 'Math' }
  ]);

  // QuestionUpload
  await QuestionUpload.create([
    { question: 'What is 2+2?', subject: 'Math', uploadedBy: 'Dr. Jane' },
    { question: 'Explain HTTP.', subject: 'CS', uploadedBy: 'Dr. Smith' }
  ]);

  // Student
  await Student.create([
    { name: 'Student One', email: 'student1@univ.edu', rollNo: 'S001' },
    { name: 'Student Two', email: 'student2@univ.edu', rollNo: 'S002' }
  ]);

  console.log('Dummy data inserted successfully!');
  await mongoose.disconnect();
}

insertDummyData().catch(err => {
  console.error('Error inserting dummy data:', err);
  mongoose.disconnect();
});

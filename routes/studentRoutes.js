const express = require('express');
const { getStudents, getStudentsByID, createStudent, updateStudent, deleteStudent } = require('../controllers/studentController');

// router object
const router = express.Router()

//Routes

//GET All Student List || GET
router.get('/getall', getStudents)

//GET Student By ID
router.get('/get/:id', getStudentsByID)

//Create Student (Create)
router.post('/create', createStudent)

//Update Student 
router.put('/update/:id', updateStudent)

//Delete Student 
router.delete('/delete/:id', deleteStudent)



module.exports = router
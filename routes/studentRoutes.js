const express = require('express');
const { getStudents, getStudentsByID, createStudent } = require('../controllers/studentController');

// router object
const router = express.Router()

//Routes

//GET All Student List || GET
router.get('/getall', getStudents)

//GET Student By ID
router.get('/get/:id', getStudentsByID)

//POST Student (Create)
router.post('/create', createStudent)

module.exports = router
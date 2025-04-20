const express = require('express');
const { getStudents, getStudentsByID } = require('../controllers/studentController');

// router object
const router = express.Router()

//Routes

//GET All Student List || GET
router.get('/getall', getStudents)

//GET ALl Student By ID
router.get('/get/:id', getStudentsByID )

module.exports = router
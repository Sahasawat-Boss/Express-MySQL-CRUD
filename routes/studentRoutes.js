const express = require('express');
const { getStudents } = require('../controllers/studentController');

// router object
const router = express.Router()

//Routes

//GET All Student List || GET
router.get('/getall', getStudents)

module.exports = router
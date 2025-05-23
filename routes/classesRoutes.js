const express = require('express');
const { getClasses, getClassesByID, createClasses,deleteClasses } = require('../controllers/classesController');

// router object
const router = express.Router()

//Routes

//GET All Classes List || GET
router.get('/getall', getClasses)

//GET Classes By ID
router.get('/get/:id', getClassesByID)

//Create Classes (Create)
router.post('/create', createClasses)

//Delete Classes 
router.delete('/delete/:id', deleteClasses)



module.exports = router
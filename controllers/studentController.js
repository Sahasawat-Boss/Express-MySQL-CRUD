const db = require("../config/db");

//!GET ALL STUDENT LIST ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const getStudents = async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM students')
        if (!data) {
            return res.status(404).send({
                sucess: false,
                message: 'No record found',
            });
        }

        res.status(200).send({
            sucess: true,
            message: 'All Student Record from Student DB',
            totalStudents: data[0].length,
            data: data[0],
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            message: 'ERROR on GET all student API',
            error
        });
    }
}

//!GET Student By ID +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const getStudentsByID = async (req, res) => {
    try {
        const studentID = req.params.id
        if (!studentID) {
            return res.status(404).send({
                sucess: false,
                message: 'Invalid Student ID',
            });
        }
        const data = await db.query(`SELECT * FROM students where id=?`, [studentID])
        if (!data) {
            return res.status(404).send({
                sucess: false,
                message: 'No record found',
            });
        }

        res.status(200).send({
            sucess: true,
            message: 'Student ID Record',
            totalStudents: data[0].length,
            data: data[0],
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            message: 'ERROR on GET student by ID API',
            error
        });
    }
}

module.exports = { getStudents, getStudentsByID };
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
        const data = await db.query(`SELECT * FROM students where id = ?`, [studentID])
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
};

//!CREATE Student +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const createStudent = async (req, res) => {
    try {
        const { name, roll_no, fees, classes, medium, age } = req.body
        if (!name || !roll_no || !classes || !medium || !fees || !age) {
            return res.status(500).send({
                sucess: false,
                message: 'Please provide all fields',
            });
        }
        const data = await db.query(
            `INSERT INTO students (name, roll_no, fees, classes, medium, age) VALUES (?, ?, ?, ?, ?, ?)`,
            [name, roll_no, fees, classes, medium, age]
        );
        if (!data) {
            return res.status(404).send({
                sucess: false,
                message: 'ERROR Insering Query',
            });
        }
        res.status(201).send({
            success: true,
            message: 'New student record created successfully',
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            message: 'ERROR creating Student API',
            error
        });
    }
};

//!UPDATE Student +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, roll_no, classes, medium, fees, age } = req.body;

        if (!id || !name || !roll_no || !classes || !medium || !fees || !age) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields',
            });
        }

        const data = await db.query(
            `UPDATE students 
                SET name = ?, roll_no = ?, fees = ?, classes = ?, medium = ?, age = ?
                WHERE id = ?`,
            [name, roll_no, fees, classes, medium, age, id]
        );

        res.status(200).send({
            success: true,
            message: 'Student record updated successfully',
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'ERROR updating student API',
            error,
        });
    }
};

//!DELETE Student +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const deleteStudent = async (req, res) => {
    try {
        const studentID = req.params.id
        if (!studentID) {
            return res.status(404).send({
                sucess: false,
                message: 'Please provide valid student ID',
            });
        }
        await db.query(`DELETE FROM students WHERE id = ?`, [studentID])
        res.status(200).send({
            sucess: true,
            message: 'Student deleted sucessfully',
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'ERROR deleting student API',
            error,
        });
    }
}




module.exports = {
    getStudents,
    getStudentsByID,
    createStudent,
    updateStudent,
    deleteStudent
};
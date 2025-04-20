const db = require("../config/db");

//!GET ALL Classes LIST ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const getClasses = async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM Classes')
        if (!data) {
            return res.status(404).send({
                sucess: false,
                message: 'No record found',
            });
        }

        res.status(200).send({
            sucess: true,
            message: 'All Classes Record from Classes DB',
            totalClasses: data[0].length,
            data: data[0],
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            message: 'ERROR on GET all Classes API',
            error
        });
    }
}

//!GET Classes By ID +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const getClassesByID = async (req, res) => {
    try {
        const ClassesID = req.params.id
        if (!ClassesID) {
            return res.status(404).send({
                sucess: false,
                message: 'Invalid Classes ID',
            });
        }
        const data = await db.query(`SELECT * FROM Classes where id = ?`, [ClassesID])
        if (!data) {
            return res.status(404).send({
                sucess: false,
                message: 'No record found',
            });
        }

        res.status(200).send({
            sucess: true,
            message: 'Classes ID Record',
            totalClasses: data[0].length,
            data: data[0],
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            message: 'ERROR on GET Classes by ID API',
            error
        });
    }
};

//!CREATE Classes +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const createClasses = async (req, res) => {
    try {
        const { name, room, teacher, schedule } = req.body
        if (!name || !room || !teacher || !schedule) {
            return res.status(500).send({
                sucess: false,
                message: 'Please provide all fields',
            });
        }
        const data = await db.query(
            `INSERT INTO Classes (name, room, teacher, schedule) VALUES (?, ?, ?, ?)`,
            [name, room, teacher, schedule]
        );
        if (!data) {
            return res.status(404).send({
                sucess: false,
                message: 'ERROR Insering Query',
            });
        }
        res.status(201).send({
            success: true,
            message: 'New Classes record created successfully',
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            message: 'ERROR creating Classes API',
            error
        });
    }
};


module.exports = {
    getClasses,
    getClassesByID,
    createClasses,
};
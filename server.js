const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mySqlPool = require('./config/db');

//Config dotenv
dotenv.config();

//rest object
const app = express()

//Middlewares
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/student', require('./routes/studentRoutes'))

app.use('/api/v1/classes', require('./routes/classesRoutes'))

// Routes
app.get("/test", (req, res) => {
    res.status(200).send('<h1>Nodejs Mysql CRUD...</h1>')
})

// PORT
const PORT = process.env.PORT || 8000;
// "Use the value of PORT from the environment (.env file or system). If that’s not available, use 8000 as a default fallback."

//contidionaly Listen
mySqlPool
    .query('SELECT 1')
    .then(() => {
        // MY SQL
        console.log('MY SQL DB Connected'.bgCyan.white);
        // Listen
        app.listen(PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`.bgMagenta.white);
        });
    }).catch((error) => {
        console.log(error);
    })


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=
// node --watch server.js

// Update Script to npm run dev =  node --watch server.js
// npm run dev
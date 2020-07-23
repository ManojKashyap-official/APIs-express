const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const error = require('./middelware/error');
const genreController = require('./routes/genreController');
const customerController = require('./routes/customerController');
const movieController = require('./routes/movieController');
const rentalController = require('./routes/rentalController');
const userController = require('./routes/userController');
const authController = require('./routes/authController')
const express = require('express');
const app = express();


mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genreController);
app.use('/api/customers', customerController);
app.use('/api/movies', movieController);
app.use('/api/rentals', rentalController);
app.use('/api/users', userController);
app.use('/api/auth', authController);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
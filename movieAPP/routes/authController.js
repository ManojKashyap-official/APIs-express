const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();



router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    console.log('lllllllllllll');
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Opps Invalid Email or Password...');


    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid Email Or Password...');

    const token = user.generateAuthToken();


    res.send(token);
});



function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}





module.exports = router;
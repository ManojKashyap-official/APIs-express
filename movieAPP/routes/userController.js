const { User, validate } = require('../models/user');
const auth = require('../middelware/auth');
const _ = require('lodash');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



router.get('/me', auth, async(req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
    console.log('oooooooooooooooooo', user);
});


router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User is already register...');
    console.log('kkkkkkkkkkkkkkkkkk');

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)

    await user.save();

    const token = user.generateAuthToken();
    console.log('x-header-token-->', token);

    res.header('x-header-token', token).send(_.pick(user, ['id', 'name', 'email', 'password']));
    console.table(_.pick(user, ['name', 'email', 'password']));
});

router.get('/', async(req, res) => {
    const users = await User.find().sort('name');
    res.send(users);

})



module.exports = router;
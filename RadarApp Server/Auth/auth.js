const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const userModel = require('../Model/user.model')
const express = require('express');

const router = express.Router();

//register end point
router.post('/register', (req, res) => {
    console.log(req.body)
    const firstname = req.body.firstname;
    const username = req.body.username;
    const lastname = req.body.lastname;
    const password = req.body.password;

    const user = new userModel();
    user.firstname = firstname;
    user.lastname = lastname;
    user.username = username;
    user.password = password;

    user.save((err, newUser) => {
        if (err) {
            res.send({ succses: "Filed to Add user", status: 500 });
            console.log('Error in the DB', err);
        }
        let payload = { sub: newUser._id };
        let token = jwt.encode(payload, '123')

        res.status(200).send({ token });
    })
});


//login end point
router.post('/login', async (req, res) => {
    let userData = req.body;
    let user = await userModel.findOne({ username: userData.username });

    if (!user) {
        return res.status(401).send({ message: 'User Name Or Password Is Not Valid' })
    }

    bcrypt.compare(userData.password, user.password, (err, isMatch) => {
        if (!isMatch) {
            return res.status(401).send({ message: 'User Name Or Password Is Not Valid' })
        }

        // let payload = { sub: user._id };
        let payload = user._id;
        let token = jwt.encode(payload, '123')


        res.status(200).send({ token });
    });
});

module.exports = router;


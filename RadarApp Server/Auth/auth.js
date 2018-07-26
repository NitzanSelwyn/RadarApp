const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const userModel = require('../Model/user.model')
const express = require('express');

const router = express.Router();

//register end point
router.post('/register', (req, res) => {
    console.log(req.body)
    //puting the data that recived from front-end 
    const firstname = req.body.firstname;
    const username = req.body.username;
    const lastname = req.body.lastname;
    const password = req.body.password;
    const fcmToken = req.body.fcmToken;

    const user = new userModel();
    user.firstname = firstname;
    user.lastname = lastname;
    user.username = username;
    user.password = password;
    user.fcmToken = fcmToken;

    //saving the user to DB
    user.save((err, newUser) => {
        if (err) {
            //if there is an error sending 500 to front-end
            res.send({ succses: "Filed to Add user", status: 500 });
            console.log('Error in the DB', err);
        }
        // if user exsit saving his ID to paylod
        let payload = { sub: newUser._id };
        //encodeing the payload into token
        let token = jwt.encode(payload, '123')

        //sending 200 to front-end and sending with it the token
        res.status(200).send({ token });
    })
});


//login end point
router.post('/login', async (req, res) => {
    let userData = req.body;
    //searching in DB for a user with this user name
    let user = await userModel.findOne({ username: userData.username });

    //if user dose'nt exsist send 401 to front-end
    if (!user) {
        return res.status(401).send({ message: 'User Name Or Password Is Not Valid' })
    }

    //compareing password got  from front-end to the password of the user name got from DB
    bcrypt.compare(userData.password, user.password, (err, isMatch) => {
        if (!isMatch) {
            //if dose'nt mach send 401 to fron-end
            return res.status(401).send({ message: 'User Name Or Password Is Not Valid' })
        }

        //if mach encode the user ID as a token
        let payload = user._id;
        let token = jwt.encode(payload, '123')

        // send front-end 200 with the token
        res.status(200).send({ token });
    });
});

//exporting the auth module
module.exports = router;


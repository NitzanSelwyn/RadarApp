const bcrypt = require("bcrypt");
const jwt = require('jwt-simple');

const userModel = require("../models/user");

//gets all user without password
app.get('/users/', async (req, res) => {
    try {
        //getting all the users but the passsword
        let users = await userModel.find({}, '-password -__v');
        //sending all the users to front-end
        res.send(users);
    } catch (error) {
        //if there was an error log it into console
        console.log(error);
        //sending 500 to front-end
        res.sendStatus(500);
    }
});

//get user by id and send his user name without password
app.get('/users/:id', async (req, res) => {
    try {
        //getting the user by getting the ID from the entered URL(or more specific by for this by 
        // getting the authur ID fron more details of the event)
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            let user = await userModel.findById(req.params.id, '-password -__v');
            //gettting the user user name 
            userToSend = user.username;
            //sending the user name to front-end
            res.send(userToSend);
        }
    } catch (error) {
        //if there was an error log it
        console.log(error);
        //sending 500 to the front-end
        res.sendStatus(500);
    }
});

// get the user FcmToken
app.get('/users/fcmToken/:id', async (req, res) => {
    try {
        //finding the user by getting the ID fron the enterd URL
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            let user = await userModel.findById(req.params.id);
            //getting the user fcmToken
            fcmToken = user.fcmToken;
            //sending the fcmToken to the front-end  
            res.send(fcmToken);
        }
    } catch (error) {
        //if there was an error log it
        console.log(error);
        //sending 500 to the front-end
        res.sendStatus(500);
    }
});
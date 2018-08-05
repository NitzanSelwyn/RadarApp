const bcrypt = require("bcrypt");
const jwt = require('jwt-simple');

const userModel = require("../models/user");

//gets all user without password
exports.GetAllUsers(async (req, res) => {
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
exports.GetAllUsersByID(async (req, res) => {
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
exports.GetUserFCMToken(async (req, res) => {
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

// getting a FcmToken from the client and updateing the current user
exports.UpdateUserFCMToken(async (req, res) => {
    //getting the user new fcmToken
    const fcmToken = req.body.fcmToken
    //getting the user token
    var authorization = req.body.userToken;
    //decodeing the user token
    var decoded = jwt.decode(authorization, '123')
    var userID = decoded;
    //finding the user by the doceded token & updateing his fcmToken with the one got from the front-end
    let event = await userModel.updateOne({ '_id': userID }, { $Set: { 'fcmToken': fcmToken } }, (err, res) => {
        if (err) {
            //if there was an error log It
            console.log(err);
        } else {
            res;
        }
    })

})
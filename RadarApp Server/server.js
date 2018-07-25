const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require('body-parser')
const app = express();
const cors = require('cors');
const jwt = require('jwt-simple');


const postModel = require('./Model/post.model')
const userModel = require('./Model/user.model')

const auth = require('./Auth/auth')

//connection to MongoDB Atlas
const db = mongoose.connect('mongodb+srv://nitzanSelwyn:123nitzan123@locationproject-vh41z.mongodb.net/test')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could Not Connect', err));



app.use(cors());
app.use(bodyparser.json())

//app.set('port', process.env.process || 3000);
var port = process.env.PORT || 5000;

//main server
app.get('/', (req, res) => {
    res.send('This is the SERVER');
});

//get event by id for more details
app.get('/events/:id', async (req, res) => {
    // var author = req.params.id;
    // var events = await postModel.find({ author });
    // req.send(events);
    try {
        let events = await postModel.findById(req.params.id);
        // events.author = await userModel.findById(event.author);
        res.send(events);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//gets all user without password
app.get('/users/', async (req, res) => {
    try {
        let events = await userModel.find({}, '-password -__v');
        res.send(events);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//get user by id and send his user name without password
app.get('/users/:id', async (req, res) => {

    try {
        let user = await userModel.findById(req.params.id, '-password -__v');
        userToSend = user.firstname;
        console.log(userToSend);
        res.send(userToSend);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/users/fcmToken/:id', async (req, res) => {

    try {
        let user = await userModel.findById(req.params.id, '-password -__v');
        fcmToken = user.fcmToken;
        res.send(fcmToken);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//get current user profile(dosent work)
app.get('/profile/:id', (req, res) => {

    console.log(req.body.id)
    var authorization = req.body.id;
    if (authorization != null) {
        var decoded = jwt.decode(authorization, '123')
        // var author = postModel.findById(decoded);
        var author = decoded;
        console.log(author);
        try {
            let user = userModel.findById(author, '-password -__v');

            res.send(user);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }

});

//get all events
app.get('/events', async (req, res) => {
    try {
        let events = await postModel.find({});
        res.send(events);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//post new event
app.post('/event', async (req, res, next) => {

    const title = req.body.title;
    const description = req.body.description;
    const time = req.body.time
    const date = req.body.date;
    const location = req.body.location;
    const address = req.body.address;

    // const author = req.body.author;

    var authorization = req.body.author;
    var decoded = jwt.decode(authorization, '123')
    // var author = postModel.findById(decoded);
    var author = decoded;
    console.log(author);



    var event = new postModel();

    event.description = description;
    event.title = title;
    event.time = time;
    event.date = date
    event.location = location;
    event.address = address;

    event.author = author;

    event.save((err, results) => {
        if (err) {
            console.error('saveing event err');
            res.sendStatus(500);
        }
        res.sendStatus(200);
        //   res.end();
    });


});

//registering to an event
app.put('/events', async (req, res) => {
    console.log(req.body)
    var eventID = req.body.eventID;

    var authorization = req.body.authorID;
    var decoded = jwt.decode(authorization, '123')
    var author = decoded;
    var authorID = decoded;

    let event = await postModel.updateOne({ '_id': eventID }, { $addToSet: { 'participants': authorID } }, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            res;
        }
    })

});

app.put('/updateuser', async (req, res) => {
    console.log(req.body);

    const fcmToken = req.body.fcmToken
    var authorization = req.body.userToken;
    var decoded = jwt.decode(authorization, '123')
    var userID = decoded;
    let event = await userModel.updateOne({ '_id': userID }, { $Set: { 'fcmToken': fcmToken } }, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            res;
        }
    })

})


//middle weare
app.use('/auth', auth);

//listening
app.listen(port, function () {
    console.log('listening on', + port);
});



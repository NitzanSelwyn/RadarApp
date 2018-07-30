const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require('body-parser')
const app = express();
const cors = require('cors');
const jwt = require('jwt-simple');

const postModel = require('./Model/post.model')
const userModel = require('./Model/user.model')

const auth = require('./Auth/auth')

//connection to MongoDB Atlas, by getting the connection string from Atlas. 
//the connection string must contain user name & password of the admin or a user that can edit in the DB
const db = mongoose.connect('mongodb+srv://nitzanSelwyn:123nitzan123@locationproject-vh41z.mongodb.net/test')
    //if connected successfully logging 
    .then(() => console.log('Connected to MongoDB...'))
    //if connection faild logging the error
    .catch(err => console.error('Could Not Connect', err));

app.use(cors());
app.use(bodyparser.json())

// getting PORT from the enviroment(when hosting on a website like heroku port will be assgin automaticly by the website) or use the defulte 5000
var port = process.env.PORT || 5000;

//main server
app.get('/', (req, res) => {
    //if rech the main directory of the server sending a message
    res.send('This is the SERVER');
});

//get event by id for more details
app.get('/events/:id', async (req, res) => {
    try {
        //searching for the event by getting the event ID that was enterd into the URL
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            let event = await postModel.findById(req.params.id);
            //sending the event to the front-end
            res.send(event);
        }
    } catch (error) {
        //if there was an error log it into console
        console.log(error);
        //sending 500 to the front-end
        res.sendStatus(500);
    }
});

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

//get all events
app.get('/events', async (req, res) => {
    try {
        //getting all the events from DB
        let events = await postModel.find({});
        //sending the events
        res.send(events);
    } catch (error) {
        //if there was an error log it
        console.log(error);
        //sending 500 to the front-end
        res.sendStatus(500);
    }
});

//post new event
app.post('/event', async (req, res, next) => {

    //getting the info for the new event from the front-end
    const title = req.body.title;
    const description = req.body.description;
    const time = req.body.time
    const date = req.body.date;
    const location = req.body.location;
    const address = req.body.address;


    //getting the user token as he post a new event so I 
    //can save his user ID to the DB in the events collection
    var authorization = req.body.author;
    //decoding the token so it will turn into an Id
    var decoded = jwt.decode(authorization, '123')
    var author = decoded;

    //saving all the data into a new event
    var event = new postModel();

    event.description = description;
    event.title = title;
    event.time = time;
    event.date = date
    event.location = location;
    event.address = address;


    event.author = author;



    //saving the new event into the DB
    event.save((err, results) => {
        if (err) {
            //if there was an error log it
            console.error('saveing event err', err);
            //sending 500 to the front-end
            res.sendStatus(500);
        }
        //if there was'nt any error sending 200 to the front-end
        res.sendStatus(200);
    });


});

//registering to an event
app.put('/events', async (req, res) => {

    //getting the event ID
    var eventID = req.body.eventID;
    //getting the User ID
    var userID = req.body.currentUserID;
    //updating the event with the ID got from the front-end & adding the user ID that wants to be register to this event into
    //the participants field
    let event = await postModel.updateOne({ '_id': eventID }, { $addToSet: { 'participants': userID } }, (err, res) => {
        if (err) {
            //if there was an error log it
            console.log(err);
        }
    })
});

// getting a FcmToken from the client and updateing the current user
app.put('/updateuser', async (req, res) => {
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

app.post('/notify', (req, res) => {

    var headers = {
        'Authorization': 'key=AIzaSyDV6hcrbzVzzgp4FIs4G488IZ_NWVjd7xA',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    var options = {
        url: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: headers,
        body: {
            "to": req.body.authorFcmToken,
            "collapse_key": "type_a",
            "notification": {
                "body": "Test",
                "title": "Hello World"
            }
        }
    }

    http.request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            res.send(response);
        }
    })
});

//middle weare
app.use('/auth', auth)

//listening
app.listen(port, function () {
    //loging if the server was successfully running & and logging one wich port
    console.log('listening on', + port);
});


//Add headers
// app.use((req, res, next) => {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'https://fcm.googleapis.com/fcm/send');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

//app.options("*", cors(options));



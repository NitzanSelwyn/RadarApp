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

//sending push notification
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

//Add headers
app.use((req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//listening
app.listen(port, function () {
    //loging if the server was successfully running & and logging one wich port
    console.log('listening on', + port);
});




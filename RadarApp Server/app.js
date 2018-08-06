const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require('body-parser')
const cors = require('cors');
const jwt = require('jwt-simple');

const userRoutes = require('./routes/userRouter');
const eventRoutes = require('./routes/eventRouter');

const auth = require('./Auth/auth')

const app = express();

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


//middle weare
app.use('/auth', auth)
app.use('/api/user', userRoutes);
app.use('/api/event', eventRoutes);

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

module.exports = app;
;




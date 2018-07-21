const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require('body-parser')
const app = express();
const cors = require('cors');
const jwt = require('jwt-simple');


const postModel = require('./Model/post.model')
const userModel = require('./Model/user.model')

const auth = require('./Auth/auth')


const db = mongoose.connect('mongodb+srv://nitzanSelwyn:123nitzan123@locationproject-vh41z.mongodb.net/test')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could Not Connect', err));



app.use(cors());
app.use(bodyparser.json())

app.set('port', process.env.process || 3000);

app.get('/', (req, res) => {
    res.send('This is the SERVER');
});

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



// app.get('/:id', async (req, res) => {
//     // var author = req.params.id;
//     // var events = await postModel.find({ author });
//     // req.send(events);
//     try {
//         let events = await userModel.findById(req.params.id);
//         // events.author = await userModel.findById(event.author);
//         res.send(events);
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// });

app.get('/events', async (req, res) => {
    try {
        let events = await postModel.find({});
        res.send(events);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


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



// app.post('/register', auth.register);

// app.post('/login', auth.login);

app.use('/auth', auth);

app.listen(app.get('port'), (err, res) => {
    console.log("server is running");
});



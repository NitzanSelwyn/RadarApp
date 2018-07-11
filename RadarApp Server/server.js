const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require('body-parser')
const app = express();
const cors = require('cors');

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
        res.send(events);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/events', async (req, res) => {
    try {
        let events = await postModel.find({});
        res.send(events);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


app.post('/event', async (req, res) => {
    var event = new postModel(req.body);

    // var author = '5b427fc6e63de147b8423b1d';
    // event.author = await postModel.find({ author });
    //req.send(events)
    // var event = new postModel(data)

    event.save((err, results) => {
        if (err) {
            console.error('saveing event err');
            res.send(500).send({ message: 'Saving Event Error' });
        }
        res.sendStatus(200);
    });
});



// app.post('/register', auth.register);

// app.post('/login', auth.login);

app.use('/auth', auth);

app.listen(app.get('port'), (err, res) => {
    console.log("server is running");
});



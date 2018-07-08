const userModel = require('./Model/user.model')
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const db = mongoose.connect('mongodb+srv://nitzanSelwyn:123nitzan123@locationproject-vh41z.mongodb.net/test')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could Not Connect', err));





app.set('port', process.env.process || 3000);

app.get('/', (req, res) => {
    res.send('hello');
});


app.post('/register', (req, res) => {
    const firstname = req.body.firstname;
    const username = req.body.username;
    const lastname = req.body.lastname;
    const password = req.body.password;

    const user = new userModel();
    user.firstname = firstname;
    user.lastname = lastname;
    user.username = username;
    user.password = password;

    user.save((err, results) => {
        if (err) {
            console.log('Error in the DB');
        }
        res.sendStatus(200);
    })

});

app.listen(app.get('port'), (err, res) => {
    console.log("server is running");
});



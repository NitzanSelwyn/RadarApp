const userModel = require('./Model/user.model')
const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require('body-parser')
const app = express();
const cors = require('cors');

const db = mongoose.connect('mongodb+srv://nitzanSelwyn:123nitzan123@locationproject-vh41z.mongodb.net/test')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could Not Connect', err));




app.use(cors());

app.set('port', process.env.process || 3000);
app.use(bodyparser.json())
app.get('/', (req, res) => {
    res.send('This is the SERVER');
});


app.post('/register', (req, res) => {
    console.log(req.body)
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
            res.send({ succses: "Filed to Add user", status: 500 });
        }
        res.send({ success: "Success", status: 200 });
    })

});

app.listen(app.get('port'), (err, res) => {
    console.log("server is running");
});



const userModel = require('./Model/user.model')
const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require('body-parser')
const app = express();
const cors = require('cors');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');


const db = mongoose.connect('mongodb+srv://nitzanSelwyn:123nitzan123@locationproject-vh41z.mongodb.net/test')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could Not Connect', err));



app.use(cors());
app.use(bodyparser.json())

app.set('port', process.env.process || 3000);

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
            res.send({ succses: "Filed to Add user", status: 500 });
            console.log('Error in the DB', err);
        }
        res.send({ success: "Success", status: 200 });
    })

});

app.post('/login', async (req, res) => {
    let userData = req.body;
    let user = await userModel.findOne({ username: userData.username });

    if (!user) {
        return res.status(401).send({ message: 'User Name Or Password Is Not Valid' })
    }

    bcrypt.compare(userData.password, user.password, (err, isMatch) => {
        if (!isMatch) {
            return res.status(401).send({ message: 'User Name Or Password Is Not Valid' })
        }

        let payload = {};
        let token = jwt.encode(payload, '123')

        res.status(200).send({ token });
    });
});

app.listen(app.get('port'), (err, res) => {
    console.log("server is running");
});



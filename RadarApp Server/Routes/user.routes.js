const jwt = require('jsonwebtoken');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

const users = [
    {
        id: 1,
        firstName: 'Nitzan',
        lastName: 'Selwyn',
        username: 'Nitzans',
        password: '123456'
    },
    {
        id: 2,
        firstName: 'Mikmak',
        lastName: 'Cofefe',
        username: 'Cofefe',
        password: '123456'
    }
];

router.get('/', (req, res) => {
    res.send(users);
});

router.get('/:id', (req, res) => {

    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('the user not found');
    res.send(user);
    // to get query url parameters we use:
    // req.query
});

router.post('/', (req, res) => {

    const { error } = validateUser(req.body);
    if (error) return req.status(400).send(error.details[0].message);


    const user = {
        id: users.length + 1,
        name: req.body.name
    };

    users.push(user);
    res.send(user);
});

router.post('/authenticate', (req, res) => {
    // get the user who tried to log in
    const user = users.find(u => u.id === req.body.username);

    if (!user) {
        jwt.sign({ user: user }, 'secretkey', (err, token) => {
            res.json({
                token: token
            });
        });
    }
});

router.put('/:id', (req, res) => {
    //find the user
    //if not existing, return 404
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('the user with the given id was not found');


    //validate
    //if invalid, return 400 - bad request
    const result = validateUser(req.body);
    const { error } = validateUser(req.body); // result.error 
    if (error) return res.status(400).send(error.details[0].message);


    //update the user
    user.name = req.body.name;
    //return the updated user
    res.send(user);
});

router.delete('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('the user with the given id was not found');

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send(user);
});



function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(user, schema);
}

module.exports = router;
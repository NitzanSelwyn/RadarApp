const userModel = require('./Model/user.model')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-LocationProj')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could Not Connect', err));

const userSchema = mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String },
    password: { type: String }
});
const User = mongoose.model('Course', userSchema);


async function CreateUser() {
    const user = new User({
        firstname: 'nitzan',
        lastname: 'Selwyn',
        username: 'nitzan',
        password: '12345'
    });
    const res = await user.save();
    console.log(res);
}

CreateUser();

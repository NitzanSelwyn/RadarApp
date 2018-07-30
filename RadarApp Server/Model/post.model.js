const mongoose = require('mongoose');
const user = require('./user.model');

//event MongoDB model
module.exports = mongoose.model('Event', {
    title: String,
    description: String,
    time: String,
    date: String,
    location: { lat: Number, lng: Number },
    address: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
});



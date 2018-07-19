const mongoose = require('mongoose');
const user = require('./user.model');

module.exports = mongoose.model('Event', {
    title: { Type: String },
    description: { Type: String },
    time: { Type: String },
    date: { Type: String },
    location: { lat: Number, lng: Number },
    address: { Type: String },
    author: { Type: String },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
});
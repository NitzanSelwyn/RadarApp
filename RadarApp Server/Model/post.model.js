const mongoose = require('mongoose');

module.exports = mongoose.model('Event', {
    title: String,
    description: String,
    time: String,
    date: String,
    location: { lat: Number, lng: Number },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});
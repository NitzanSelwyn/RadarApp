const mongoose = require('mongoose');

module.exports = mongoose.model('Event', {
    title: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});
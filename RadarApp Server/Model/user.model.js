const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


//user MongoDB model
const userSchema = mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String },
    password: { type: String },
    fcmToken: { type: String }
});

userSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.hash(user.password, null, null, (err, hash) => {
        if (err) return next(err);

        user.password = hash;
        next();
    });

});

module.exports = mongoose.model('User', userSchema);
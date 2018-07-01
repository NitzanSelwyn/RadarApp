const User = require('../models/user');
const mongoose = require('mongoose');
const config = require('../config.json');

mongoose.connect(config.connectionString)
    .then(() => console.log('db connected...'))
    .catch((err) => console.log('db connection failed: ' + err));

var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service._delete = _delete;

module.exports = service;

function authenticate(username, password) {

}

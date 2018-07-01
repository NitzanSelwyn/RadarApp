require('rootpath')();
const express = require('express');
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');

const morgan = require('morgan');
const helmet = require('helmet');
const users = require('./routes/users');

app.use(expressJwt({
    secret: config.secret,
    getToken: (req) => {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/users/authenticate', '/users/register'] }));

//routes
app.use('/users', users);
//error handling
app.use((err, req, res, next) => {
    if (err.name == 'UnauthorizedError') {
        return res.status(401).send('Invalid Token');
    } else {
        throw err;
    }
});


const port = process.env.PORT || 4666;
app.listen(port, () => console.log(`listening on port ${port}`));


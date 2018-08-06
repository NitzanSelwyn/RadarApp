const express = require('express');
const bodyParser = require('body-parser');

const UserController = require('../controllers/userConroller');

const router = express.Router();
router.use(bodyParser.json());

// get fcm token
router.get('/fcmtoken/:id', UserController.GetUserFCMToken);

// get all users
router.get('', UserController.GetAllUsers);

// get user by ID
router.get('/:id', UserController.GetUsersByID);

// update fcmToken
router.put('fcmtoken/:id', UserController.UpdateUserFCMToken);



module.exports = router;
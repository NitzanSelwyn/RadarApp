
const express = require("express");
const notificationController = require('../controllers/notificationsController');

const router = express.Router();

router.post('/notify', notificationController.PostNotification);

module.exports = router;
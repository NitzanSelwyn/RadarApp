const express = require('express');
const bodyParser = require('body-parser');

const EventController = require('../controllers/eventsController');

const router = express.Router();
router.use(bodyParser.json());

//post new event
router.post('', EventController.CreatNewEvent);

//get event by ID
router.get('/:id', EventController.GetEventByID);

//get all events
router.get('', EventController.GetAllEvents);

router.put('', EventController.RegisterToAnEvent)


module.exports = router;




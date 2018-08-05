const postModel = require('../models/event');


//get event by id for more details
exports.GetEventByID(async (req, res) => {
    try {
        //searching for the event by getting the event ID that was enterd into the URL
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            let event = await postModel.findById(req.params.id);
            //sending the event to the front-end
            res.send(event);
        }
    } catch (error) {
        //if there was an error log it into console
        console.log(error);
        //sending 500 to the front-end
        res.sendStatus(500);
    }
});

//get all events
exports.GetAllEvents(async (req, res) => {
    try {
        //getting all the events from DB
        let events = await postModel.find({});
        //sending the events
        res.send(events);
    } catch (error) {
        //if there was an error log it
        console.log(error);
        //sending 500 to the front-end
        res.sendStatus(500);
    }
});

//creat new event
exports.CreatNewEvent(async (req, res, next) => {

    //getting the info for the new event from the front-end
    const title = req.body.title;
    const description = req.body.description;
    const time = req.body.time
    const date = req.body.date;
    const location = req.body.location;
    const address = req.body.address;


    //getting the user token as he post a new event so I 
    //can save his user ID to the DB in the events collection
    var authorization = req.body.author;
    //decoding the token so it will turn into an Id
    var decoded = jwt.decode(authorization, '123')
    var author = decoded;

    //saving all the data into a new event
    var event = new postModel();

    event.description = description;
    event.title = title;
    event.time = time;
    event.date = date
    event.location = location;
    event.address = address;


    event.author = author;



    //saving the new event into the DB
    event.save((err, results) => {
        if (err) {
            //if there was an error log it
            console.error('saveing event err', err);
            //sending 500 to the front-end
            res.sendStatus(500);
        }
        //if there was'nt any error sending 200 to the front-end
        res.sendStatus(200);
    });


});

//registering to an event
exports.RegisterToAnEvent(async (req, res) => {

    //getting the event ID
    var eventID = req.body.eventID;
    //getting the User ID
    var authorization = req.body.currentUserID;
    //decodeing the user token
    var decoded = jwt.decode(authorization, '123')
    var userID = decoded;
    //updating the event with the ID got from the front-end & adding the user ID that wants to be register to this event into
    //the participants field
    let event = await postModel.updateOne({ '_id': eventID }, { $addToSet: { 'participants': userID } }, (err, res) => {
        if (err) {
            //if there was an error log it
            console.log(err);
        }
    })
});
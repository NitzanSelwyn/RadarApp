const http = require("http");

//sending push notification
exports.PostNotification = (req, res) => {

    var headers = {
        'Authorization': 'key=AIzaSyDV6hcrbzVzzgp4FIs4G488IZ_NWVjd7xA',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
    var options = {
        url: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: headers,
        body: {
            "to": req.body.authorFcmToken,
            "collapse_key": "type_a",
            "notification": {
                "body": "Test",
                "title": "Hello World"
            }
        }
    }

    http.request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            res.send(response);
        }
    })
};
const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp();

exports.fcmSend = functions.database.ref('/messages/{userId}/{messageId}').onCreate((snapshot, context) => {


    const message = snapshot.val()
    const userId = context.params.userId

    const payload = {
        notification: {
            title: snapshot.val().title,
            body: snapshot.val().body,
            icon: "https://placeimg.com/250/250/people"
        }
    };


    admin.database()
        .ref(`/fcmTokens/${userId}`)
        .once('value')
        .then(token => token.val())
        .then(userFcmToken => {
            return admin.messaging().sendToDevice(userFcmToken, payload)
        })
        .then(res => {
            console.log("Sent Successfully", res);
        })
        .catch(err => {
            console.log(err);
        });

});
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');


var config = {
    apiKey: "AIzaSyAtWn-5WkUeM_XlNDekzAIIc5ZM5BJgKac",
    authDomain: "firstfirebaseproject-a45c3.firebaseapp.com",
    databaseURL: "https://firstfirebaseproject-a45c3.firebaseio.com",
    projectId: "firstfirebaseproject-a45c3",
    storageBucket: "firstfirebaseproject-a45c3.appspot.com",
    messagingSenderId: "236948604143"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    const title = 'Hello World from SW!';
    const options = {
        body: payload.data.status
    };
    return self.registration.showNotification(title, options);
});
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// config is the web configuration got from firebase website
var config = {
    apiKey: "AIzaSyAtWn-5WkUeM_XlNDekzAIIc5ZM5BJgKac",
    authDomain: "firstfirebaseproject-a45c3.firebaseapp.com",
    databaseURL: "https://firstfirebaseproject-a45c3.firebaseio.com",
    projectId: "firstfirebaseproject-a45c3",
    storageBucket: "firstfirebaseproject-a45c3.appspot.com",
    messagingSenderId: "236948604143"
};

//initializeing firebase 
firebase.initializeApp({
    'messagingSenderId': '236948604143'
})

//registering the firebaase messaging with this service worker
const messaging = firebase.messaging();
//this is if the website is closed so you can recive notification
messaging.setBackgroundMessageHandler(function (payload) {
    //logging that you recived a message
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    var notificationTitle = 'Background Message Title';
    var notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});
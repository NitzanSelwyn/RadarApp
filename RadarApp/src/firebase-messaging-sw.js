importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');


var config = {
    apiKey: "AIzaSyAtWn-5WkUeM_XlNDekzAIIc5ZM5BJgKac",
    authDomain: "firstfirebaseproject-a45c3.firebaseapp.com",
    databaseURL: "https://firstfirebaseproject-a45c3.firebaseio.com",
    projectId: "firstfirebaseproject-a45c3",
    storageBucket: "firstfirebaseproject-a45c3.appspot.com",
    messagingSenderId: "236948604143"
};
// firebase.initializeApp({
//     navigator: serviceWorker.register('/firebase-messaging-sw.js')
//         .then((registration) => {
//             messaging.useServiceWorker(registration);

//             // Request permission and get token.....
//             // this.messaging.requestPermission()
//             //     .then(() => {
//             //         console.log('Notification permission granted.');
//             //         return this.messaging.getToken()
//             //     })
//             //     .then(token => {
//             //         console.log(token)
//             //         this.updateToken(token)
//             //     })
//             //     .catch((err) => {
//             //         console.log('Unable to get permission to notify.', err);
//             //     });
//         }),
//     config,
// });

// const messaging = firebase.messaging();


// firebase.initializeApp({
//     'messagingSenderId': '236948604143'
// });

firebase.initializeApp({
    'messagingSenderId': '236948604143'
})

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
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
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: "705927968079"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'theozproject';
    const notificationOptions = {
        click_action: "http://localhost:3000",
        icon: 'https://i.imgur.com/nwSt5DQ.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCwBzuN3EWE5mq0VczwYj3WTKxejWY_-QU",
  authDomain: "web-projects-5fc4c.firebaseapp.com",
  projectId: "web-projects-5fc4c",
  storageBucket: "web-projects-5fc4c.appspot.com",
  messagingSenderId: "490656189808",
  appId: "1:490656189808:web:400cc3a78d4ebc03e093b5",
  measurementId: "G-7B4HF4150D",
});

const messaging = firebase.messaging();

// Set up the message handler
messaging.onBackgroundMessage((payload) => {
  // Handle the push notification in the service worker
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.sshowNotification(notificationTitle, notificationOptions);
});

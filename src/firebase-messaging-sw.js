// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyCwBzuN3EWE5mq0VczwYj3WTKxejWY_-QU",
//   authDomain: "web-projects-5fc4c.firebaseapp.com",
//   projectId: "web-projects-5fc4c",
//   storageBucket: "web-projects-5fc4c.appspot.com",
//   messagingSenderId: "490656189808",
//   appId: "1:490656189808:web:400cc3a78d4ebc03e093b5",
//   measurementId: "G-7B4HF4150D"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCwBzuN3EWE5mq0VczwYj3WTKxejWY_-QU",
  authDomain: "web-projects-5fc4c.firebaseapp.com",
  projectId: "web-projects-5fc4c",
  storageBucket: "web-projects-5fc4c.appspot.com",
  messagingSenderId: "490656189808",
  appId: "1:490656189808:web:400cc3a78d4ebc03e093b5",
  measurementId: "G-7B4HF4150D"
});

const messaging = firebase.messaging();
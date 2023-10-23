importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");

/* Project Settings > General > Your Apps > Config */
firebase.initializeApp({
  apiKey: "AIzaSyCSwm8-WO45QieRsBdfmflIGsrKFTtaBko",
  authDomain: "web-apps-6e1ff.firebaseapp.com",
  projectId: "web-apps-6e1ff",
  storageBucket: "web-apps-6e1ff.appspot.com",
  messagingSenderId: "396998306432",
  appId: "1:396998306432:web:99988aa3b1f460ee131465",
  measurementId: "G-1CT9NTF4S9",
});

const messaging = firebase.messaging();

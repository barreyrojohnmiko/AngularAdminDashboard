// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2SudRI1YKECK7Vsb8TiwOg3o6iNB9btU",
  authDomain: "admindashboard-95c54.firebaseapp.com",
  projectId: "admindashboard-95c54",
  storageBucket: "admindashboard-95c54.appspot.com",
  messagingSenderId: "425465733692",
  appId: "1:425465733692:web:916bc22bd1549e4d195939",
  measurementId: "G-T40TBNRLTK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAM11fz3N-h8JxXDxu8DWikI_87QVDzgSk",
  authDomain: "betfront-49822.firebaseapp.com",
  projectId: "betfront-49822",
  storageBucket: "betfront-49822.appspot.com",
  messagingSenderId: "1098953649139",
  appId: "1:1098953649139:web:0e9e3726e04fc6516ac086",
  measurementId: "G-0HH1CJ3XPJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const auth = firebase.auth();


export {firebase, auth}



 
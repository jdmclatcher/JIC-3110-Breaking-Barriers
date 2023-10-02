// src/firebase.js
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = { apiKey: "AIzaSyC167vRvahOHwcXRjEuLwsPOoqhUKiiKXE",
    authDomain: "breaking-barriers-e787e.firebaseapp.com",
    projectId: "breaking-barriers-e787e",
    storageBucket: "breaking-barriers-e787e.appspot.com",
    messagingSenderId: "1091466718229",
    appId: "1:1091466718229:web:b594d80df1aa0adcd0721c",
    measurementId: "G-HETQ6EN2G3" };

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();

export { auth };
export default firebase;

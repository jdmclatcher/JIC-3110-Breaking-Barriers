// src/firebase.js
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = { /* your configuration object here */ };

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();

export { auth };

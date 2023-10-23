// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC167vRvahOHwcXRjEuLwsPOoqhUKiiKXE",
    authDomain: "breaking-barriers-e787e.firebaseapp.com",
    projectId: "breaking-barriers-e787e",
    storageBucket: "breaking-barriers-e787e.appspot.com",
    messagingSenderId: "1091466718229",
    appId: "1:1091466718229:web:b594d80df1aa0adcd0721c",
    measurementId: "G-HETQ6EN2G3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export default app
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Adjust the path according to your file structure

createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("Account created:", user);
    })
    .catch((error) => {
        console.error("Error creating account:", error);
    });


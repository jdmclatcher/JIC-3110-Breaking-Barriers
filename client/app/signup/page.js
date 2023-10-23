'use client'
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase"; // Adjust the path according to your file structure


function Page() {
    const navigateToHome = () => {
        router.push("/",  { scroll: false });
    }

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("Account created:", user);
            // You can now save additional user data to your database if needed
            // Redirect or show a success message
            router.push("/");
        } catch (error) {
            console.error("Error creating account:", error);
            alert("Failed to create user");
        }
    }
    return (<div className="wrapper">
        <div className="form-wrapper">
            <h1 className="mt-60 mb-30">Sign up</h1>
            <form onSubmit={handleForm} className="form">
                <label htmlFor="email">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                </label>
                <label htmlFor="password">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                </label>
                <button type="submit">Sign up</button>
            </form>
        </div>
    </div>);
}

export default Page;
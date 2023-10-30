'use client'
import React from "react";
import { useRouter } from 'next/navigation'
import { supabase } from "../../supabase/supabaseClient";


function Page() {
    const navigateToHome = () => {
        router.push("/",  { scroll: false });
    }

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()

        const { user, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            console.error("Error creating account:", error);
            alert("Failed to create user");
        } else {
            console.log("Account created:", user);
            // You can now save additional user data to your database if needed
            // Redirect or show a success message
            router.push("/");
        }
    }
    return (<div className="wrapper">
        <div className='bg-gradient-to-r from-gray-400 to-gray-300 p-4 h-screen flex justify-center items-center'>
            <div className='bg-gradient-to-r from-orange-400 to-orange-300 rounded-lg h-5/6 w-1/3 p-5'>
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
    </div>
        </div>
    </div>);
}

export default Page;
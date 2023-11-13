
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';
import { supabase } from "@/supabase/supabaseClient";

export default function Home() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const router = useRouter()

  const handleForm = async (event) => {
    event.preventDefault()

    const email = usernameRef.current.value;
    const password = passwordRef.current.value;

    const { user, error } = await supabase.auth.signInWithPassword({email, password});

    if (error) {
      console.error("Error logging in:", error);
      alert("Failed to log in");
    } else {
      console.log("Logged in:", user);
      // Fetch additional user data, including role
      const { data, error: fetchError } = await supabase
          .from('profiles') // Replace 'profiles' with your user table name
          .select('role')   // Adjust if your role field has a different name
          //.eq('id', user.id)
          .single();

      if (fetchError) {
        console.error("Error fetching user role:", fetchError);
        // Handle error
      } else {
        if (data.role === 'administrator') {
          router.push('/admin-dashboard', {scroll: false});
        } else {
          router.push('/dashboard', {scroll: false});
        }
      }
    }
  }

  return (
    <main>
      <div className='bg-gradient-to-r from-gray-400 to-gray-300 p-4 h-screen flex justify-center items-center'>
        <div className='bg-gradient-to-r from-orange-400 to-orange-300 rounded-lg h-5/6 w-1/3 p-5'>
          <h1 className='text-xl text-white font-bold flex justify-center p-5'>Breaking Barriers Training Application</h1>
          <div className="relative mb-3" data-te-input-wrapper-init>
            <input
              type="text"
              className="peer block min-h-[auto] w-full rounded border-0 bg-gradient-to-r from-orange-300 to-orange-200 px-3 py-[0.32rem] leading-[1.6] font-medium"
              required
              ref={usernameRef}
              placeholder="Email" />
          </div>


          <div className="relative mb-3" data-te-input-wrapper-init>
            <input
              type="password"
              className="peer block min-h-[auto] w-full rounded border-0 bg-gradient-to-r from-orange-300 to-orange-200 px-3 py-[0.32rem] leading-[1.6] font-medium"
              id="exampleFormControlInputPassword"
              ref={passwordRef}
              required
              placeholder="Password" />

          </div>

          <div className="flex justify-center p-5">
            <button onClick={handleForm}
              type="button"
              className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-orange-400 w-5/6 px-3 pb-1 pt-2.5 text-md font-medium uppercase leading-normal text-primary-700"
              >
              Login
            </button>
          </div>
          <div className="flex justify-center p-2">
            <Link 
              className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-orange-400 w-5/6 px-3 pb-1 pt-2.5 text-md font-medium uppercase leading-normal text-primary-700
              flex justify-center" 
              href="/signup">Create Account
            </Link>
          </div>
        </div>

      </div>
    </main>

  )
}

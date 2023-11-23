"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { supabase } from "@/supabase/supabaseClient";

export default function Home() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    const loginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    let response = await fetch(
      `http://localhost:${process.env.NEXT_PUBLIC_SERVER_PORT}/account/login`,
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let responseData = await response.json();
    alert(responseData.message);
    if (responseData.success) {
      router.push("/dashboard");
    }
  };

  return (
    <main>
      <div className="bg-gradient-to-r from-gray-400 to-gray-300 p-4 h-screen flex justify-center items-center">
        <div className="bg-gradient-to-r from-orange-400 to-orange-300 rounded-lg h-5/6 w-1/3 p-5">
          <h1 className="text-xl text-white font-bold flex justify-center p-5">
            Breaking Barriers Training Application
          </h1>
          <div className="relative mb-3" data-te-input-wrapper-init>
            <input
              type="text"
              className="peer block min-h-[auto] w-full rounded border-0 bg-gradient-to-r from-orange-300 to-orange-200 px-3 py-[0.32rem] leading-[1.6] font-medium"
              required
              ref={emailRef}
              placeholder="Email"
            />
          </div>

          <div className="relative mb-3" data-te-input-wrapper-init>
            <input
              type="password"
              className="peer block min-h-[auto] w-full rounded border-0 bg-gradient-to-r from-orange-300 to-orange-200 px-3 py-[0.32rem] leading-[1.6] font-medium"
              id="exampleFormControlInputPassword"
              ref={passwordRef}
              required
              placeholder="Password"
            />
          </div>

          <div className="flex justify-center p-5">
            <button
              onClick={handleForm}
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
              href="/signup"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

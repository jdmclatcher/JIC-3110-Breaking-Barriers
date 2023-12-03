"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    const callbackUrl = "/dashboard";

    const result = await signIn("credentials", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      redirect: false,
    });

    if (result?.error) {
      alert(result);
    }
    console.log(result);

    if (result?.ok) {
      router.push(callbackUrl);
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  const getSession = async () => {
    const res = await fetch("/api/auth/session", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { session } = await res.json();

    if (session?.user) {
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

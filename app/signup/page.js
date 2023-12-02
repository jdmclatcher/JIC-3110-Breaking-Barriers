"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Page() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userTypeRef = useRef();
  const router = useRouter();

  const handleForm = async (e) => {
    e.preventDefault();

    let accountData = {
      p_per_id: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      userType: userTypeRef.current.value,
    };
    let response = await fetch("/api/account", {
      method: "POST",
      body: JSON.stringify(accountData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseData = await response.json();
    alert(responseData.message);
    if (response.status === 200) {
      router.push("/");
    }
  };

  return (
    <div className="wrapper">
      <div className="bg-gradient-to-r from-gray-400 to-gray-300 p-4 h-screen flex justify-center items-center">
        <div className="bg-gradient-to-r from-orange-400 to-orange-300 rounded-lg h-5/6 w-1/3 p-5">
            <h1 className="text-xl text-white font-bold flex justify-center p-5">Sign up</h1>
            <form onSubmit={handleForm} className="form">
              <label htmlFor="username">Username</label>
              <input
                ref={usernameRef}
                required
                className="peer block min-h-[auto] w-full rounded border-0 bg-gradient-to-r from-orange-300 to-orange-200 px-3 py-[0.32rem] leading-[1.6] font-medium"
                type="text"
                name="username"
                id="username"
                placeholder="Username"
              />

              <label htmlFor="email">Email</label>
              <input
                ref={emailRef}
                required
                className="peer block min-h-[auto] w-full rounded border-0 bg-gradient-to-r from-orange-300 to-orange-200 px-3 py-[0.32rem] leading-[1.6] font-medium"
                type="email"
                name="email"
                id="email"
                placeholder="example@mail.com"
              />

              <label htmlFor="password">Password</label>
              <input
                ref={passwordRef}
                required
                className="peer block min-h-[auto] w-full rounded border-0 bg-gradient-to-r from-orange-300 to-orange-200 px-3 py-[0.32rem] leading-[1.6] font-medium"
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />

              <label htmlFor="firstname">First Name</label>
              <input
                ref={firstNameRef}
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-gradient-to-r from-orange-300 to-orange-200 px-3 py-[0.32rem] leading-[1.6] font-medium"
                name="firstname"
                id="firstname"
                placeholder="First Name"
              />

              <label htmlFor="lastname">Last Name</label>
              <input
                ref={lastNameRef}
                type="text"
                name="lastname"
                className="peer block min-h-[auto] w-full rounded border-0 bg-gradient-to-r from-orange-300 to-orange-200 px-3 py-[0.32rem] leading-[1.6] font-medium"
                id="lastname"
                placeholder="Last Name"
              />

              <label htmlFor="usertype">User Type</label>
              <select
                ref={userTypeRef}
                required
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-gradient-to-r from-orange-300 to-orange-200 px-3 py-[0.32rem] leading-[1.6] font-medium"
                name="usertype"
                id="userType"
              >
                <option value="">Select Below</option>
                <option value="trainee">Trainee</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
              </select>

              <button type="submit" className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-orange-400 w-5/6 mt-10 px-3 pb-1 pt-2.5 text-md font-medium uppercase leading-normal text-primary-700
              flex justify-center">Sign up</button>
            </form>
            <Link href="/" className="inline-block rounded-full bg-gradient-to-r from-orange-500 to-orange-400 w-1/2 px-3 mt-10 pb-1 pt-2.5 text-md font-medium uppercase leading-normal text-primary-700
              flex justify-center">Return to Login</Link>
          </div>
        </div>
      </div>
  );
}

export default Page;

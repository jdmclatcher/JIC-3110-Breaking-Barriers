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
          <div className="form-wrapper">
            <h1 className="mt-60 mb-30">Sign up</h1>
            <form onSubmit={handleForm} className="form">
              <label htmlFor="username">Username</label>
              <input
                ref={usernameRef}
                required
                type="text"
                name="username"
                id="username"
                placeholder="Username"
              />

              <label htmlFor="email">Email</label>
              <input
                ref={emailRef}
                required
                type="email"
                name="email"
                id="email"
                placeholder="example@mail.com"
              />

              <label htmlFor="password">Password</label>
              <input
                ref={passwordRef}
                required
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />

              <label htmlFor="firstname">First Name</label>
              <input
                ref={firstNameRef}
                type="text"
                name="firstname"
                id="firstname"
                placeholder="First Name"
              />

              <label htmlFor="lastname">Last Name</label>
              <input
                ref={lastNameRef}
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Last Name"
              />

              <label htmlFor="usertype">Last Name</label>
              <select
                ref={userTypeRef}
                required
                type="text"
                name="usertype"
                id="userType"
              >
                <option value="">Select Below</option>
                <option value="trainee">Trainee</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
              </select>

              <button type="submit">Sign up</button>
            </form>
            <Link href="/">Return to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

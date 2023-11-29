"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const DashboardPage = () => {
  const { data: session } = useSession();
  console.log(session);
  const router = useRouter();
  const handleSignOut = async () => {
    signOut();
  };

  return (
    <div className="bg-gradient-to-r from-gray-400 to-gray-300 h-screen flex flex-col">
      <div className="h-screen text-lg font-bold bg-gradient-to-r from-gray-500 to-gray-400 w-1/4 p-2">
        <h1>Dashboard Page</h1>
        <Link
          className="items-center justify-center inline-block bg-gradient-to-r rounded-lg from-orange-500 to-orange-400 flex flex-col mt-5 w-full h-32 pt-2.5 text-md font-medium uppercase leading-normal text-primary-700"
          href="/dashboard/modules"
        >
          Modules
        </Link>
        <Link
          className="items-center justify-center inline-block bg-gradient-to-r rounded-lg from-orange-500 to-orange-400 flex flex-col mt-5 w-full h-32 pt-2.5 text-md font-medium uppercase leading-normal text-primary-700"
          href="/dashboard/courses"
        >
          Courses
        </Link>
        <Link
          className="items-center justify-center inline-block bg-gradient-to-r rounded-lg from-orange-500 to-orange-400 flex flex-col mt-5 w-full h-32 pt-2.5 text-md font-medium uppercase leading-normal text-primary-700"
          href="/dashboard/quizzes"
        >
          Quizzes
        </Link>
        <Link
          className="items-center justify-center inline-block bg-gradient-to-r rounded-lg from-orange-500 to-orange-400 flex flex-col mt-5 w-full h-32 pt-2.5 text-md font-medium uppercase leading-normal text-primary-700"
          href="/dashboard/quiz-results"
        >
          Quiz Results
        </Link>
        <Link
          className="items-center justify-center inline-block bg-gradient-to-r rounded-lg from-orange-500 to-orange-400 flex flex-col mt-5 w-full h-32 pt-2.5 text-md font-medium uppercase leading-normal text-primary-700"
          href="/dashboard/files"
        >
          Files
        </Link>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default DashboardPage;

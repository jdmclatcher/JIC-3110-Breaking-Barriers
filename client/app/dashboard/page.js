import React from "react";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <div className='bg-gradient-to-r from-gray-400 to-gray-300 h-screen flex flex-col'>
      <h1 className='h-screen text-lg font-bold bg-gradient-to-r from-gray-500 to-gray-400 w-1/4 p-2'>Dashboard Page
        <Link class="items-center justify-center inline-block bg-gradient-to-r rounded-lg from-orange-500 to-orange-400 flex flex-col mt-5 w-full h-1/6 pt-2.5 text-md font-medium uppercase leading-normal text-primary-700" 
              href="/dashboard/create-quiz">Create Quiz</Link>
        <Link class="items-center justify-center inline-block bg-gradient-to-r rounded-lg from-orange-500 to-orange-400 flex flex-col mt-5 w-full h-1/6 pt-2.5 text-md font-medium uppercase leading-normal text-primary-700" 
              href="/dashboard/quiz-results">Quiz Results</Link>
        <Link class="items-center justify-center inline-block bg-gradient-to-r rounded-lg from-orange-500 to-orange-400 flex flex-col mt-5 w-full h-1/6 pt-2.5 text-md font-medium uppercase leading-normal text-primary-700" 
              href="/dashboard/quiz-stats">Quiz Stats</Link>
        <Link class="items-center justify-center inline-block bg-gradient-to-r rounded-lg from-orange-500 to-orange-400 flex flex-col mt-5 w-full h-1/6 pt-2.5 text-md font-medium uppercase leading-normal text-primary-700" 
              href="/dashboard/quizzes">Quizzes</Link>
      </h1>
    </div>
  );
}

export default DashboardPage;
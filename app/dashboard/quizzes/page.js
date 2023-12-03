"use client";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ModuleContext } from "@/contexts/ModuleContext";

const QuizzesPage = () => {
  const [quizList, setQuizList] = useState([]);
  const moduleId = useContext(ModuleContext);

  // const { data: session } = useSession();
  // const user = session?.session?.user;

  const getQuizzes = async () => {
    let response = await fetch(`/api/quiz?module_id=${moduleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseData = await response.json();
    setQuizList(responseData.quizList);
  };

  useEffect(() => {
    if (moduleId) {
      getQuizzes();
    }
  }, [moduleId]);

  if (!moduleId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="border-2 rounded-md p-3 shadow-md text-xl">
          Select a Module to get started.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <Link class="m-5 flex-shrink-0 bg-secondary hover:bg-orange-700 border-secondary hover:border-orange-700 text-sm border-4 text-white py-1 px-2 rounded" href="/dashboard">Back to Dashboard</Link>
      <h1 className="quizzes-header block uppercase tracking-wide ml-5 mt-5 text-gray-700 text-xl p-2 font-bold mb-2">Quizzes</h1>
      <div className="quizzes-list">
        {quizList &&
          quizList.map((quiz, idx) => {
            return (
              <div className="quiz-item" key={`quiz-${idx}`}>
                <Link
                  href={`/dashboard/quizzes/${quiz.quiz_id}`}
                  class="m-5 flex-shrink-0 bg-secondary hover:bg-orange-700 border-secondary hover:border-orange-700 text-sm border-4 text-white py-1 px-2 rounded"
                >
                  {quiz.title}
                </Link>
                <p class="m-5 flex-shrink-0 bg-secondary hover:bg-orange-700 border-secondary hover:border-orange-700 text-sm border-4 text-white py-1 px-2 rounded">{quiz.description}</p>
              </div>
            );
          })}
        <Link class="m-5 flex-shrink-0 bg-secondary hover:bg-orange-700 border-secondary hover:border-orange-700 text-sm border-4 text-white py-1 px-2 rounded" href="/dashboard/quizzes/create">Create Quiz</Link>
      </div>
    </div>
  );
};

export default QuizzesPage;

"use client";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ModuleContext } from "@/contexts/ModuleContext";

const QuizzesPage = () => {
  const [quizList, setQuizList] = useState([]);
  const moduleId = useContext(ModuleContext);

  const { data: session } = useSession();
  const user = session?.session?.user;

  const getQuizzes = async () => {
    const trainee_id = user?.per_id;

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
    <div className="quizzes-container">
      <h1 className="quizzes-header">Quizzes</h1>
      <div className="quizzes-list">
        {quizList &&
          quizList.map((quiz, idx) => {
            return (
              <div className="quiz-item" key={`quiz-${idx}`}>
                <Link
                  href={`/dashboard/quizzes/${quiz.quiz_id}`}
                  className="quiz-title"
                >
                  {quiz.title}
                </Link>
                <p className="quiz-description">{quiz.description}</p>
              </div>
            );
          })}
        <Link href="/dashboard/quizzes/create">Create Quiz</Link>
      </div>
    </div>
  );
};

export default QuizzesPage;

"use client";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { ModuleContext } from "@/contexts/ModuleContext";
import { UserContext } from "@/contexts/UserContext";

const QuizzesPage = () => {
  const [quizList, setQuizList] = useState([]);
  const moduleId = useContext(ModuleContext);
  const user = useContext(UserContext);

  const handleDelete = async (quizId) => {
    let response = await fetch(`/api/quiz?quiz_id=${quizId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseData = await response.json();
    alert(responseData.message);

    if (moduleId) {
      getQuizzes();
    }
  };

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
    <div>
      <h1 className="quizzes-header uppercase tracking-wide ml-5 mt-5 text-gray-700 text-3xl p-2 font-bold mb-2">
        Quizzes
      </h1>
      <div className>
        {quizList && quizList.length > 0 ? (
          quizList.map((quiz, idx) => {
            return (
              <div
                className="rounded-md border-2 p-4 m-5 space-y-2 shadow-lg"
                key={`quiz-${idx}`}
              >
                <Link
                  href={`/dashboard/quizzes/${quiz.quiz_id}`}
                  className="hover:text-primary font-medium text-2xl"
                >
                  {quiz.title}
                </Link>
                <p className="text-lg font-medium rounded pb-3">
                  {quiz.description}
                </p>
                {user?.role === "instructor" && (
                  <Link
                    href={`/dashboard/quizzes/submission/${quiz.quiz_id}`}
                    className="bg-blue-700 hover:bg-blue-600 rounded-md shadow-md text-white px-3 py-1 m-1"
                  >
                    Submissions
                  </Link>
                )}
                {user?.role === "instructor" && (
                  <div className="p-1 flex justify-between">
                    <Link
                      className="bg-green-700 hover:bg-green-600 rounded-md shadow-md text-white px-3 py-1"
                      href={`/dashboard/quizzes/edit/${quiz.quiz_id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-700 hover:bg-red-600 rounded-md shadow-md text-white px-3 py-1"
                      onClick={() => {
                        handleDelete(quiz.quiz_id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="border-2 rounded-md p-4 m-5 shadow-md text-xl">
            No quizzes available for this module.
          </div>
        )}
        {user?.role === "instructor" && (
          <Link
            className="m-5 bg-secondary hover:bg-primary text-md text-white py-2 px-4 rounded shadow-md"
            href="/dashboard/quizzes/create"
          >
            Create Quiz
          </Link>
        )}
      </div>
    </div>
  );
};

export default QuizzesPage;

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "./quizzes.css";

const QuizzesPage = () => {
  const [quizList, setQuizList] = useState([]);
  const trainee_id = "test";

  const getQuizzes = async () => {
    let response = await fetch(`/api/quiz?trainee_id=${trainee_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseData = await response.json();
    console.log(responseData);
    setQuizList(responseData.quizList);
  };

  useEffect(() => {
    getQuizzes();
  }, []);

  return (
    <div className="quizzes-container">
      <Link href="/dashboard">Back to Dashboard</Link>
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

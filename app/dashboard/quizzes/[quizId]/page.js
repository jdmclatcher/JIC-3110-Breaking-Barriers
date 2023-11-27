"use client";
import { useState, useEffect } from "react";
import TraineeQuizForm from "@/components/TraineeQuizForm";
import "./quizId.css";

const TakeQuiz = ({ params }) => {
  const quizId = params.quizId;
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questionList, setQuestionList] = useState([]);

  const getQuizQuestions = async () => {
    let response = await fetch(`/api/quiz/question?quiz_id=${quizId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseData = await response.json();
    setQuestionList(responseData.questionList);
  };

  const getQuizDetails = async () => {
    let response = await fetch(`/api/quiz/detail?quiz_id=${quizId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseData = await response.json();

    setQuizTitle(responseData.title);
    setQuizDescription(responseData.description);
  };

  useEffect(() => {
    getQuizQuestions();
    getQuizDetails();
  }, []);

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">{quizTitle}</h1>
      <h2 className="quiz-description">{quizDescription}</h2>

      <TraineeQuizForm questionList={questionList} quizId={quizId} />
    </div>
  );
};

export default TakeQuiz;

"use client";
import { useState, useRef, useEffect } from "react";
import TraineeOptionsForm from "./TraineeOptionsForm";

const TraineeQuizForm = ({ questionList, quizId }) => {
  const [questionResponses, setQuestionResponses] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    let quizData = {
      trainee_id: "test",
      quiz_id: quizId,
      question_responses: Object.values(questionResponses),
    };
    // Remove hardcoded url
    let response = await fetch("/api/quiz/submit", {
      method: "POST",
      body: JSON.stringify(quizData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let responseData = await response.json();
    alert(responseData.message);
  };

  return (
    <form className="quiz-form" onSubmit={(e) => handleSubmit(e)}>
      {questionList.map((q, idx) => {
        return (
          <>
            <div className="trainee-question-text">{q.question_text}</div>
            <TraineeOptionsForm
              questionId={q.question_id}
              questionType={q.question_type}
              options={q.options}
              idx={idx}
              questionResponses={questionResponses}
              setQuestionResponses={setQuestionResponses}
            />
          </>
        );
      })}
      <input className="submit-quiz-button" type="submit" />
    </form>
  );
};

export default TraineeQuizForm;

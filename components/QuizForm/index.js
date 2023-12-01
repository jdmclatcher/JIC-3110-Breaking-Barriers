"use client";
import { useState, useRef } from "react";
import QuestionForm from "./QuestionForm";
import AddQuestionButton from "./AddQuestionButton";
import { useSession } from "next-auth/react";
import "./QuizForm.css";

const QuizForm = ({ prevQuizName, prevQuestionList }) => {
  const [questionList, setQuestionList] = useState(prevQuestionList);
  const quizTitleRef = useRef();
  const quizDescriptionRef = useRef();
  const { data: session } = useSession();
  const user = session?.session?.user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.role !== "instructor") {
      alert("Error: You are not an instructor");
      return;
    }

    let quizData = {
      instructor_id: user.per_id,
      quiz_title: quizTitleRef.current.value,
      quiz_description: quizDescriptionRef.current.value,
      quiz_questions: questionList,
    };
    let response = await fetch("/api/quiz", {
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
      <div className="quiz-name-input">
        <label>Quiz Name:</label>
        <input type="text" ref={quizTitleRef} required />
      </div>

      <div className="quiz-description-input">
        <label>Quiz Description:</label>
        <input type="text" ref={quizDescriptionRef} required />
      </div>

      {questionList.map((_, idx) => {
        return (
          <QuestionForm
            questionList={questionList}
            questionData={questionList[idx]}
            setQuestionList={setQuestionList}
            idx={idx}
            key={`question-${idx}`}
          />
        );
      })}
      <AddQuestionButton
        questionList={questionList}
        setQuestionList={setQuestionList}
      />
      <input className="save-quiz-button" type="submit" />
    </form>
  );
};

export default QuizForm;

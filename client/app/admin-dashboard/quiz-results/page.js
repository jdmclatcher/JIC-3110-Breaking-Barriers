'use client';
import React from 'react';
import './QuizResults.css';
import { useRouter } from 'next/navigation';
function QuizResults() {
  
    const quizData = {
        quizName: "Sample Quiz",
        questions: ["Question 1", "Question 2", "Question 3"],
        answers: ["Answer 1", "Answer 2", "Answer 3"],
        userAnswers: ["Answer 1", "Wrong Answer", "Answer 3"], // Replace with user's answers
      };  
    const { quizName, questions, answers, userAnswers } = quizData;

  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === answers[i]) {
        score++;
      }
    }
    return score;
  };

  const calculateIncorrectCount = () => {
    let incorrectCount = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] !== answers[i]) {
        incorrectCount++;
      }
    }
    return incorrectCount;
  };
  const router = useRouter();
  const navigateToHome = () => {
    router.push("/dashboard", { scroll: false });
  };

  return (
    <div className="quiz-results-container">
        <button className="back-button" onClick={navigateToHome}>
        Back to Home
      </button>
      <h2 className="quiz-results-header">Quiz Results - {quizName}</h2>
      <div className="quiz-summary">
        <p className="quiz-summary-item">Questions Answered: {userAnswers.length} / {questions.length}</p>
        <p className="quiz-summary-item">Incorrect Answers: {calculateIncorrectCount()}</p>
        <p className="quiz-summary-item">Score: {calculateScore()} / {questions.length}</p>
      </div>
      <h3 className="quiz-questions-header">Questions:</h3>
      <ul className="question-list">
        {questions.map((question, index) => (
          <li key={index} className="question-item">
            <p className="question-text">Q{index + 1}: {question}</p>
            <p className={`user-answer ${userAnswers[index] === answers[index] ? 'correct-answer' : 'incorrect-answer'}`}>
              Your Answer: {userAnswers[index]}
            </p>
            <p className="correct-answer">Correct Answer: {answers[index]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizResults;

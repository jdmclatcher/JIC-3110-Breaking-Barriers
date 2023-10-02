// src/components/QuizStats.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizStats.css';
function QuizStats() {

const userData = {
    userId: 1,
    quizzes: [
      {
        quizId: 101,
        quizName: "Class #1 Quiz",
        scores: [85, 92, 78, 90]
      },
      {
        quizId: 102,
        quizName: "Class #2 Quiz",
        scores: [72, 88, 95, 79]
      }
    ]
  };
  const calculateAverageScore = (scores) => {
    const total = scores.reduce((acc, score) => acc + score, 0);
    return scores.length > 0 ? (total / scores.length).toFixed(2) : 0;
  };


  const calculateMaxScore = (scores) => {
    return scores.length > 0 ? Math.max(...scores) : 0;
  };

  const calculateMinScore = (scores) => {
    return scores.length > 0 ? Math.min(...scores) : 0;
  };
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <div className="user-stats-container">
        <button className="back-button" onClick={navigateToHome}>
        Back to Home
      </button>
  <h2 className="user-stats-header">User Performance Stats (User ID: {userData.userId})</h2>
  <ul className="quiz-list">
    {userData.quizzes.map((quiz) => (
      <li key={quiz.quizId} className="quiz-item">
        <h3 className="quiz-name">{quiz.quizName}</h3>
        <div className="quiz-stats">
          <p className="quiz-stat">Average Score: {calculateAverageScore(quiz.scores)}</p>
          <p className="quiz-stat">Max Score: {calculateMaxScore(quiz.scores)}</p>
          <p className="quiz-stat">Min Score: {calculateMinScore(quiz.scores)}</p>
        </div>
        <h4 className="quiz-history-header">Quiz History:</h4>
        <ul className="quiz-history-list">
          {quiz.scores.map((score, index) => (
            <li key={index} className="quiz-history-item">Quiz {index + 1}: {score}</li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
</div>

  );
}
export default QuizStats;
  

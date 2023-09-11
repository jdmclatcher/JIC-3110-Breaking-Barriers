import React from "react";
import QuizForm from "../components/QuizForm";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate('/');
    }

    return (
        <div className="create-quiz-container">
            <button onClick={navigateToHome}>Back to Home</button>
            <h1>Create New Quiz</h1>
            <QuizForm
                prevQuizName={""}
                prevQuestionList={[]}
            />
        </div>
    )
}

export default CreateQuiz;

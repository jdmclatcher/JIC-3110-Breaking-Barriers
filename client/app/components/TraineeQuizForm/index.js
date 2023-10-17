'use client';
import { useState, useRef, useEffect } from "react";
import TraineeOptionsForm from "./TraineeOptionsForm";

const TraineeQuizForm = ({ questionList, quizId }) => {
    const [questionResponses, setQuestionResponses] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        let quizData = {
            trainee_id: "trainee1",
            quiz_id: quizId,
            question_responses: Object.values(questionResponses),
        }
        // Remove hardcoded url
        let response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_SERVER_PORT}/quiz/submit`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(quizData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            alert("Quiz submitted successfully");
        } else if (response.status === 500) {
            alert("Failed to submit.")
        }
    }

    return (
        <form className="quiz-form" onSubmit={e => handleSubmit(e)}>
            {questionList.map((q, idx) => {
                return (
                    <>
                        <div className="trainee-question-text">
                            {q.question_text}
                        </div>
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
    )

}

export default TraineeQuizForm;
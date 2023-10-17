'use client';
import { useState, useRef } from "react";
import QuestionForm from "./QuestionForm";
import AddQuestionButton from "./AddQuestionButton";
import "./QuizForm.css"

const QuizForm = ({ prevQuizName, prevQuestionList }) => {
    const [questionList, setQuestionList] = useState(prevQuestionList);
    const quizTitleRef = useRef();
    const quizDescriptionRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let quizData = {
            instructor_id: "instructor1",
            quiz_title: quizTitleRef.current.value,
            quiz_description: quizDescriptionRef.current.value,
            quiz_questions: questionList,
        }
        // Remove hardcoded url
        let response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_SERVER_PORT}/quiz/create`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(quizData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            alert("Quiz created successfully");
        } else if (response.status === 500) {
            alert("Failed to create quiz.")
        }
    }

    return (
        <form className="quiz-form" onSubmit={e => handleSubmit(e)}>
            <div className="quiz-name-input">
                <label>Quiz Name:</label>
                <input type="text" ref={quizTitleRef} required/>
            </div>

            <div className="quiz-description-input">
                <label>Quiz Description:</label>
                <input type="text" ref={quizDescriptionRef} required/>
            </div>
            
            {questionList.map((_, idx) => {
                return (
                    <QuestionForm
                        questionList={questionList}
                        questionData={questionList[idx]}
                        setQuestionList={setQuestionList}
                        idx={idx}
                    />
                )
            })}
            <AddQuestionButton
                questionList={questionList}
                setQuestionList={setQuestionList}
            />
            <input className="save-quiz-button" type="submit" />
        </form>
    )

}

export default QuizForm;

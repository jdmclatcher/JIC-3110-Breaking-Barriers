'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import "./quizzes.css"

const QuizzesPage = () => {
    const [quizList, setQuizList] = useState([]);

    const getQuizzes = async () => {
        let response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_SERVER_PORT}/quiz/trainee_get?trainee_id=${"trainee1"}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let responseData = await response.json();
        setQuizList(responseData.quizList);
    }

    useEffect(() => {
        getQuizzes();
    }, []);

    return (
        <div className="quizzes-container">
            <Link href="/dashboard">Back to Dashboard</Link>
            <h1 className="quizzes-header">Quizzes</h1>
            <div className="quizzes-list">
                {quizList.map((quiz, idx) => {
                    return (
                        <div className="quiz-item">
                            <Link href={`/dashboard/quizzes/${quiz.quiz_id}`} className="quiz-title">{quiz.title}</Link>
                            <p className="quiz-description">{quiz.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default QuizzesPage;

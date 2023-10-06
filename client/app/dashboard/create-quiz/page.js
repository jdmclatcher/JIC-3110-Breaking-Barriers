'use client';
import React from "react";
import QuizForm from "../../components/QuizForm";
import { useRouter } from "next/navigation";

const CreateQuizPage = () => {
    const router = useRouter();

    const navigateToDashboard = () => {
        router.push("/dashboard", { scroll: false });
    }

    return (
        <div className="create-quiz-container">
            <button onClick={navigateToDashboard}>Back to Dashboard</button>
            <h1>Create New Quiz</h1>
            <QuizForm
                prevQuizName={""}
                prevQuestionList={[]}
            />
        </div>
    )
}

export default CreateQuizPage;
"use client";
import React from "react";
import Link from "next/link";
import QuizForm from "@/components/QuizForm";

const CreateQuizPage = () => {
  return (
    <div className="create-quiz-container">
      <Link href="/dashboard">Back to Dashboard</Link>
      <Link href="/dashboard/quizzes">Back to Quizzes</Link>
      <h1>Create New Quiz</h1>
      <QuizForm prevQuizName={""} prevQuestionList={[]} />
    </div>
  );
};

export default CreateQuizPage;

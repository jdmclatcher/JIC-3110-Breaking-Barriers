"use client";
import React from "react";
import Link from "next/link";
import CreateQuizForm from "@/components/CreateQuizForm";

const CreateQuizPage = () => {
  return (
    <div className="mt-5 ml-5">
      <Link
        href="/dashboard/quizzes"
        className="bg-secondary text-white text-md rounded-md px-3 py-2 hover:bg-primary shadow-md"
      >
        Back to Quizzes
      </Link>
      <h1 className="uppercase tracking-wide mt-5 text-gray-700 text-3xl p-2 font-bold mb-2">
        Create New Quiz
      </h1>
      <CreateQuizForm prevQuizName={""} prevQuestionList={[]} />
    </div>
  );
};

export default CreateQuizPage;

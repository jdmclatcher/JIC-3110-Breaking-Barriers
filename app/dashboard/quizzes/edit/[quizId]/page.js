"use client";
import { useState, useEffect } from "react";
import TraineeQuizForm from "@/components/TraineeQuizForm";
import Link from "next/link";
import CreateQuizForm from "@/components/CreateQuizForm";

const EditQuizPage = ({ params }) => {
  const quizId = params.quizId;
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [quizCourse, setQuizCourse] = useState(null);
  const [questionList, setQuestionList] = useState([]);

  const getQuizQuestions = async () => {
    let response = await fetch(`/api/quiz/question?quiz_id=${quizId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseData = await response.json();
    setQuestionList(responseData.questionList);
  };

  const getQuizDetails = async () => {
    let response = await fetch(`/api/quiz/detail?quiz_id=${quizId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseData = await response.json();

    setQuizTitle(responseData.title);
    setQuizDescription(responseData.description);
    setQuizCourse(responseData.course_id);
  };

  useEffect(() => {
    getQuizQuestions();
    getQuizDetails();
  }, []);

  return (
    <div className="mt-5 ml-5">
      <Link
        href="/dashboard/quizzes"
        className="bg-secondary text-white text-md rounded-md px-3 py-2 hover:bg-primary shadow-md"
      >
        Back to Quizzes
      </Link>
      <h1 className="uppercase tracking-wide mt-5 text-gray-700 text-3xl p-2 font-bold mb-2">
        Edit Quiz
      </h1>
      <CreateQuizForm
        prevQuizId={quizId}
        prevQuizTitle={quizTitle}
        prevQuizDescription={quizDescription}
        prevQuizCourse={quizCourse}
        prevQuestionList={questionList}
        isEdit={true}
      />
    </div>
  );
};

export default EditQuizPage;

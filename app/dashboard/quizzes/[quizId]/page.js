"use client";
import { useState, useEffect, useContext } from "react";
import TraineeQuizForm from "@/components/TraineeQuizForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/UserContext";
import Spinner from "@/components/Spinner";

const TakeQuiz = ({ params }) => {
  const quizId = params.quizId;
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questionList, setQuestionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useContext(UserContext);
  const router = useRouter();

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
  };

  const checkSubmissions = async () => {
    let response = await fetch(
      `/api/submission/check?quiz_id=${quizId}&trainee_id=${user?.per_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let responseData = await response.json();

    if (response.status !== 200) {
      alert(responseData.message);
      router.push("/dashboard");
      return;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkSubmissions();
    getQuizQuestions();
    getQuizDetails();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mt-5 ml-5 space-y-2">
      <Link
        href="/dashboard/quizzes"
        className="bg-secondary text-white text-md rounded-md px-3 py-2 hover:bg-primary shadow-md"
      >
        Back to Quizzes
      </Link>
      <h1 className="uppercase tracking-wide text-gray-700 text-3xl font-bold">
        {quizTitle}
      </h1>
      <h2 className="text-gray-700 text-xl">{quizDescription}</h2>

      <TraineeQuizForm questionList={questionList} quizId={quizId} />
    </div>
  );
};

export default TakeQuiz;

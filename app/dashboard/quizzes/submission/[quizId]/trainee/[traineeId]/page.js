"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const TraineeSubmissionPage = ({ params }) => {
  const { quizId, traineeId } = params;
  const [quizTitle, setQuizTitle] = useState("");
  const [quizScore, setQuizScore] = useState();
  const [quizDescription, setQuizDescription] = useState("");
  const [submissionList, setSubmissionList] = useState([]);
  const scoreRef = useRef();

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

  const getQuizScore = async () => {
    const response = await fetch(
      `/api/submission/score?quiz_id=${quizId}&trainee_id=${traineeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();
    setQuizScore(responseData.score);
  };

  const getSubmission = async () => {
    const response = await fetch(
      `/api/submission/trainee?quiz_id=${quizId}&trainee_id=${traineeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();
    setSubmissionList(responseData.submissionList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const assignData = {
      score: scoreRef.current.value,
      trainee_id: traineeId,
      quiz_id: quizId,
    };

    const response = await fetch("/api/submission/assign", {
      method: "POST",
      body: JSON.stringify(assignData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    alert(responseData.message);
    getQuizScore();
  };

  useEffect(() => {
    getQuizDetails();
    getQuizScore();
    getSubmission();
  }, []);

  return (
    <div className="mt-5 ml-5">
      <Link
        href={`/dashboard/quizzes/submission/${quizId}`}
        className="bg-secondary text-white text-md rounded-md px-3 py-2 hover:bg-primary shadow-md"
      >
        Back to Submissions
      </Link>
      <h1 className="uppercase tracking-wide mt-5 text-gray-700 text-3xl p-2 font-bold mb-2">
        Submission for {traineeId}
      </h1>
      <p className="hover:text-primary font-medium text-2xl">{quizTitle}</p>
      <p className="text-lg font-medium rounded pb-3">{quizDescription}</p>
      <p className="text-lg font-medium rounded pb-3">
        Score: {quizScore ? quizScore : "Not Graded"}
      </p>
      <div className="border-2 rounded-md shadow-md p-3">
        {submissionList?.length > 0 ? (
          submissionList.map((s, idx) => {
            return (
              <div className="pb-3" key={idx}>
                <p className="font-bold">
                  {idx + 1}. {s.question_text}
                </p>
                {s.question_type === "multiple_choice" ? (
                  <div>
                    <p>Trainee Answer: {s.option_text}</p>
                    {s.is_correct ? (
                      <p className="font-bold text-green-700">CORRECT</p>
                    ) : (
                      <p className="font-bold text-red-700">INCORRECT</p>
                    )}
                  </div>
                ) : (
                  <p>Trainee Answer: {s.response_text}</p>
                )}
              </div>
            );
          })
        ) : (
          <div>Error loading submission. Please try again.</div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="grade" className="font-bold">
          Assign Grade:
        </label>
        <input
          required
          ref={scoreRef}
          className="border-2 rounded-md shadow-md m-3 p-1"
          type="number"
          min="0"
        />
        <input
          className="bg-green-700 text-white hover:bg-green-600 rounded-md px-3 py-2 shadow-md my-5"
          type="submit"
        />
      </form>
    </div>
  );
};

export default TraineeSubmissionPage;

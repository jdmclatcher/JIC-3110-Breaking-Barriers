"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const SubmissionPage = ({ params }) => {
  const quizId = params.quizId;
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [submissionList, setSubmissionList] = useState([]);

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

  const getSubmissions = async () => {
    let response = await fetch(`/api/submission?quiz_id=${quizId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseData = await response.json();
    setSubmissionList(responseData.submissionList);
  };

  useEffect(() => {
    getQuizDetails();
    getSubmissions();
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
        Submissions
      </h1>
      <p className="font-medium text-2xl">{quizTitle}</p>
      <p className="text-lg font-medium rounded pb-3">{quizDescription}</p>
      <div className="border-2 rounded-md shadow-md p-2 m-3">
        {submissionList && submissionList.length > 0 ? (
          <>
            <div className="flex flex-row justify-between p-2">
              <p className="font-bold">Name</p>
              <p className="font-bold">Score</p>
            </div>
            {submissionList.map((s, idx) => {
              return (
                <div className="flex flex-row justify-between p-1" key={idx}>
                  <Link
                    href={`/dashboard/quizzes/submission/${quizId}/trainee/${s.trainee_per_id}`}
                    className="hover:text-red-700"
                  >
                    {s.trainee_last_name}, {s.trainee_first_name}
                  </Link>
                  <p>{s.score ? s.score : "Not graded yet"}</p>
                </div>
              );
            })}
          </>
        ) : (
          <div>No submissions yet.</div>
        )}
      </div>
    </div>
  );
};

export default SubmissionPage;

"use client";
import { useContext, useState } from "react";
import TraineeOptionsForm from "./TraineeOptionsForm";
import { UserContext } from "@/contexts/UserContext";

const TraineeQuizForm = ({ questionList, quizId }) => {
  const [questionResponses, setQuestionResponses] = useState({});
  const user = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let quizData = {
      trainee_id: "test",
      quiz_id: quizId,
      question_responses: Object.values(questionResponses),
    };
    let response = await fetch("/api/quiz/submit", {
      method: "POST",
      body: JSON.stringify(quizData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let responseData = await response.json();
    alert(responseData.message);
  };

  return (
    <form
      className="border-2 rounded-md shadow-md p-3 flex flex-col"
      onSubmit={(e) => handleSubmit(e)}
    >
      {questionList &&
        questionList.map((q, idx) => {
          return (
            <div key={idx} className="pb-4">
              <p className="text-lg">
                {idx + 1}. {q.question_text}
              </p>
              <TraineeOptionsForm
                questionId={q.question_id}
                questionType={q.question_type}
                options={q.options}
                idx={idx}
                questionResponses={questionResponses}
                setQuestionResponses={setQuestionResponses}
              />
            </div>
          );
        })}
      {user?.role === "trainee" && (
        <input
          className="bg-green-700 hover:bg-green-600 text-white px-2 py-1 rounded-md shadow-md"
          type="submit"
        />
      )}
    </form>
  );
};

export default TraineeQuizForm;

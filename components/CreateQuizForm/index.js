"use client";
import { useState, useRef, useContext, useEffect } from "react";
import QuestionForm from "./QuestionForm";
import AddQuestionButton from "./AddQuestionButton";
import { ModuleContext } from "@/contexts/ModuleContext";
import { UserContext } from "@/contexts/UserContext";

const CreateQuizForm = ({
  prevQuizId,
  prevQuizTitle,
  prevQuizDescription,
  prevQuizCourse,
  prevQuestionList,
  isEdit,
}) => {
  const [questionList, setQuestionList] = useState([...prevQuestionList]);
  const [courseList, setCourseList] = useState([]);
  const quizTitleRef = useRef();
  const quizDescriptionRef = useRef();
  const user = useContext(UserContext);
  const moduleId = useContext(ModuleContext);
  const courseRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user?.role !== "instructor") {
      alert("Error: You are not an instructor");
      return;
    }

    let quizData = {
      instructor_id: user?.per_id,
      quiz_title: quizTitleRef.current.value,
      quiz_description: quizDescriptionRef.current.value,
      quiz_questions: questionList,
      module_id: moduleId,
      course_id: courseRef.current.value,
    };

    let apiMethod = "POST";
    if (isEdit) {
      apiMethod = "PATCH";
      quizData.quiz_id = prevQuizId;
    }

    let response = await fetch("/api/quiz", {
      method: apiMethod,
      body: JSON.stringify(quizData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let responseData = await response.json();
    alert(responseData.message);
  };

  useEffect(() => {
    if (moduleId) {
      getCourses();
      setQuestionList([...prevQuestionList]);
    }
  }, [moduleId, prevQuestionList]);

  const getCourses = async () => {
    const response = await fetch(`/api/course?module_id=${moduleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    setCourseList(responseData.courseList);
  };

  if (!moduleId) {
    return <div>Select a module to continue.</div>;
  }

  return (
    <form className="flex flex-col m-5" onSubmit={(e) => handleSubmit(e)}>
      <label className="font-medium text-lg">Quiz Name:</label>
      <input
        className="border-2 rounded-md p-2 border-gray-600 shadow-md"
        type="text"
        ref={quizTitleRef}
        required
        defaultValue={prevQuizTitle}
      />

      <label className="font-medium text-lg">Quiz Description:</label>
      <input
        className="border-2 rounded-md p-2 border-gray-600 shadow-md"
        type="text"
        ref={quizDescriptionRef}
        required
        defaultValue={prevQuizDescription}
      />

      <label className="font-medium text-lg">
        Associated Course (Optional):{" "}
      </label>
      <select
        className="border-2 rounded-md p-2 mb-4 border-gray-600 shadow-md"
        ref={courseRef}
        type="text"
        defaultValue={prevQuizCourse}
      >
        <option value={""}>Select a Course</option>
        {courseList &&
          courseList.map((c) => {
            return (
              <option key={c.course_id} value={c.course_id}>
                {c.title}
              </option>
            );
          })}
      </select>

      {questionList.map((_, idx) => {
        return (
          <QuestionForm
            questionList={questionList}
            questionData={questionList[idx]}
            setQuestionList={setQuestionList}
            idx={idx}
            key={`question-${idx}`}
          />
        );
      })}
      <AddQuestionButton
        questionList={questionList}
        setQuestionList={setQuestionList}
      />

      <input
        className="bg-green-700 text-white hover:bg-green-600 rounded-md px-3 py-2 shadow-md my-5"
        type="submit"
      />
    </form>
  );
};

export default CreateQuizForm;

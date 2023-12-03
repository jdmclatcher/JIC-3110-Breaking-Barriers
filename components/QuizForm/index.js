"use client";
import { useState, useRef, useContext, useEffect } from "react";
import QuestionForm from "./QuestionForm";
import AddQuestionButton from "./AddQuestionButton";
import { useSession } from "next-auth/react";
import { ModuleContext } from "@/contexts/ModuleContext";
import "./QuizForm.css";

const QuizForm = ({ prevQuizName, prevQuestionList }) => {
  const [questionList, setQuestionList] = useState(prevQuestionList);
  const [courseList, setCourseList] = useState([]);
  const quizTitleRef = useRef();
  const quizDescriptionRef = useRef();
  const { data: session } = useSession();
  const user = session?.session?.user;
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
    let response = await fetch("/api/quiz", {
      method: "POST",
      body: JSON.stringify(quizData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let responseData = await response.json();
    alert(responseData.message);
  };

  const handleCourse = (e) => {
    e.preventDefault();
    setCourse(e.target.value);
  };

  useEffect(() => {
    if (moduleId) {
      getCourses();
    }
  }, [moduleId]);

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

  return (
    <form className="quiz-form" onSubmit={(e) => handleSubmit(e)}>
      <div className="quiz-name-input">
        <label>Quiz Name:</label>
        <input type="text" ref={quizTitleRef} required />
      </div>

      <div className="quiz-description-input">
        <label>Quiz Description:</label>
        <input type="text" ref={quizDescriptionRef} required />
      </div>

      <label>Associated Course (Optional): </label>
      <select ref={courseRef} type="text">
        <option value={null}>Select a Course</option>
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
      <input className="save-quiz-button" type="submit" />
    </form>
  );
};

export default QuizForm;

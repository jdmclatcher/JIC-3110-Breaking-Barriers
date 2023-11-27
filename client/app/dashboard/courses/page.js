"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "./Courses.css";

const CoursesPage = () => {
  const [courseList, setCourseList] = useState([]);
  const instructor_id = "instructor1";

  const getCourses = async () => {
    let response = await fetch(
      `http://localhost:${process.env.NEXT_PUBLIC_SERVER_PORT}/course/get-instructor?instructor_id=${instructor_id}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let responseData = await response.json();
    setCourseList(responseData.courseList);
  };

  const handleDelete = async (course_id) => {
    let response = await fetch(
      `http://localhost:${process.env.NEXT_PUBLIC_SERVER_PORT}/course/delete?course_id=${course_id}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      alert("Successfully deleted course");
      getCourses();
    } else if (response.status === 500) {
      alert("Failed to delete course");
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="courses-container">
      <Link href="/dashboard">Back to Dashboard</Link>
      <h1 className="courses-header">Courses</h1>
      <div className="courses-list">
        {courseList.map((course, idx) => {
          return (
            <div className="course-item" key={`course-${idx}`}>
              <h2 className="course-title">{course.course_title}</h2>
              <p className="course-description">{course.course_description}</p>
              <button
                className="delete-course-button"
                onClick={() => {
                  handleDelete(course.course_id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
        <Link href="/dashboard/courses/create" className="create-course-button">
          Create course
        </Link>
      </div>
    </div>
  );
};

export default CoursesPage;

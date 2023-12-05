"use client";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { ModuleContext } from "@/contexts/ModuleContext";
import { UserContext } from "@/contexts/UserContext";
import "./Courses.css";
import Course from "@/components/Course";

const InstructorCoursePage = () => {
  const user = useContext(UserContext);
  const [courseList, setCourseList] = useState([]);
  const moduleId = useContext(ModuleContext);

  const getCourses = async () => {
    let response = await fetch(`/api/course?module_id=${moduleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseData = await response.json();

    setCourseList(responseData.courseList);
  };

  const handleDelete = async (course_id) => {
    let response = await fetch(`/api/course?course_id=${course_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      alert("Successfully deleted course");
      getCourses();
    } else if (response.status === 500) {
      alert("Failed to delete course");
    }
  };

  useEffect(() => {
    getCourses();
  }, [moduleId]);

  return (
    <div className="courses-container">
      <h1 className="courses-header pl-8 pt-4 text-3xl">Courses</h1>
      <div className="courses-list">
        {courseList &&
          courseList.map((course, idx) => {
            return (
              <Course
                params={{
                  courseIdx: idx,
                  courseTitle: course.title,
                  courseDesc: course.description,
                  courseId: course.course_id,
                }}
                handleDelete={handleDelete}
                key={`course-${idx}`}
              />
            );
          })}
        {user?.role === "instructor" && (
          <Link
            href="/dashboard/courses/create"
            className="bg-secondary p-2 ml-8 rounded-lg hover:bg-[#facc15]"
          >
            Create course
          </Link>
        )}
      </div>
    </div>
  );
};

export default InstructorCoursePage;

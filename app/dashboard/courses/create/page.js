"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const CreateCoursePage = () => {
  const [moduleList, setModuleList] = useState([]);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const moduleRef = useRef();

  const { data: session } = useSession();
  const user = session?.session?.user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.role !== "instructor") {
      alert("Error: You are not an instructor");
      return;
    }

    const courseData = {
      instructor_id: user.per_id,
      module_id: moduleRef.current.value,
      course_title: titleRef.current.value,
      course_description: descriptionRef.current.value,
    };
    let response = await fetch("/api/course", {
      method: "POST",
      body: JSON.stringify(courseData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseData = await response.json();

    alert(responseData.message);
  };

  const getModules = async () => {
    const administrator_id = user.per_id;

    let response = await fetch(
      `/api/module?administrator_id=${administrator_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response) {
      console.error("No response from fetch");
      return;
    }
    let responseData = await response.json();
    if (!responseData || !responseData.moduleList) {
      console.error("Invalid or empty response data");
      return;
    }
    setModuleList(responseData.moduleList);
  };

  useEffect(() => {
    getModules();
  }, []);

  return (
    <div className="courses-container">
      <Link href="/dashboard">Back to Dashboard</Link>
      <div>
        <Link href="/dashboard/courses">Back to Courses</Link>
      </div>
      <h1 className="courses-header">Create Course</h1>
      <div className="courses-list">
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="email">
            <p>Course Title</p>
            <input ref={titleRef} required type="text" />
          </label>
          <label htmlFor="password">
            <p>Course Description</p>
            <input ref={descriptionRef} required type="text" />
          </label>
          <label htmlFor="module">
            <p>Module</p>
            <select ref={moduleRef} required type="text">
              <option value="">Select Below</option>
              {moduleList.map((module, idx) => {
                return (
                  <option key={`module-${idx}`} value={module.module_id}>
                    {module.title}
                  </option>
                );
              })}
            </select>
          </label>
          <div>
            <button type="submit">Create Course</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCoursePage;

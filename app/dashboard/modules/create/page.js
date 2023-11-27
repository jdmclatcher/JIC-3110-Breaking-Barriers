"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CreateModulePage = () => {
  const router = useRouter();
  const [instructorList, setInstructorList] = useState([]);
  const titleRef = useRef();
  const detailsRef = useRef();
  const instructorRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const moduleData = {
      administrator_id: "pkim",
      instructor_id: instructorRef.current.value,
      module_title: titleRef.current.value,
      module_details: detailsRef.current.value,
    };

    let response = await fetch("/api/module", {
      method: "POST",
      body: JSON.stringify(moduleData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseData = await response.json();
    alert(responseData.message);
  };

  const getInstructors = async () => {
    let response = await fetch("/api/instructor", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let responseData = await response.json();
    setInstructorList(responseData.instructorList);
  };

  useEffect(() => {
    getInstructors();
  }, []);

  return (
    <div className="modules-container">
      <Link href="/dashboard">Back to Dashboard</Link>
      <div>
        <Link href="/dashboard/modules">Back to Modules</Link>
      </div>
      <h1 className="modules-header">Create Module</h1>
      <div className="modules-list">
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="email">
            <p>Module Title</p>
            <input ref={titleRef} required type="text" />
          </label>
          <label htmlFor="password">
            <p>Module Details</p>
            <input ref={detailsRef} required type="text" />
          </label>
          <label htmlFor="password">
            <p>Assigned Instructor</p>
            <select ref={instructorRef} required type="text">
              <option value="">Select Below</option>
              {instructorList.map((instructor, idx) => {
                return (
                  <option value={instructor.per_id} key={`instructor-${idx}`}>
                    {instructor.first_name} {instructor.last_name}
                  </option>
                );
              })}
            </select>
          </label>
          <div>
            <button type="submit">Create Module</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateModulePage;

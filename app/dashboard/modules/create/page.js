"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const CreateModulePage = () => {
  const [instructorList, setInstructorList] = useState([]);
  const titleRef = useRef();
  const detailsRef = useRef();
  const instructorRef = useRef();

  const { data: session } = useSession();
  const user = session?.session?.user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.role !== "admin") {
      alert("Error: Only admins can create modules");
      return;
    }

    const moduleData = {
      administrator_id: user.per_id,
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
    <div className="modules-container bg-orange-200 h-full">
      <div className="buttons flex p-5">
      <Link class="m-5 flex-shrink-0 bg-secondary hover:bg-orange-700 border-secondary hover:border-orange-700 text-sm border-4 text-white py-1 px-2 rounded" href="/dashboard">Back to Dashboard</Link>

      <Link class="m-5 flex-shrink-0 bg-secondary hover:bg-orange-700 border-secondary hover:border-orange-700 text-sm border-4 text-white py-1 px-2 rounded" href="/dashboard/modules">Back to Modules</Link>
      </div>


      <div className="p-2">
        <h1 className="block uppercase tracking-wide text-gray-700 text-4xl text-center font-bold mb-2">Create Module</h1>
        <div className="modules-list">
          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="email" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              <p>Module Title</p>
              <input ref={titleRef} required type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-orange-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"/>
            </label>
            <label htmlFor="password" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              <p>Module Details</p>
              <input ref={detailsRef} required type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-orange-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
            </label>
            <label htmlFor="password">
              <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Assigned Instructor</p>
              <select ref={instructorRef} required type="text" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
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
              <button type="submit" class="mt-5 flex-shrink-0 bg-secondary hover:bg-orange-700 border-secondary hover:border-orange-700 text-sm border-4 text-white py-1 px-2 rounded">Create Module</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateModulePage;

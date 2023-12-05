"use client";
import { useRef, useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModuleContext } from "@/contexts/ModuleContext";
import { UserContext } from "@/contexts/UserContext";

const CreateCoursePage = () => {
  const [moduleList, setModuleList] = useState([]);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const router = useRouter();
  const moduleId = useContext(ModuleContext);
  const user = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.role !== "instructor") {
      alert("Error: You are not an instructor");
      return;
    }

    const courseData = {
      instructor_id: user?.per_id,
      module_id: moduleId,
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
    if (!user || !user.per_id) {
      router.push("/");
    }
    const administrator_id = user?.per_id;

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
    <div className="mt-5 ml-5">
      <div className="mb-5">
        <Link
          href="/dashboard/courses"
          className="m-5 flex-shrink-0 bg-secondary hover:bg-orange-700 border-secondary hover:border-orange-700 text-sm border-4 text-white py-1 px-2 rounded"
        >
          Back to Courses
        </Link>
      </div>
      <h1 className="block uppercase tracking-wide text-gray-700 text-4xl font-bold mb-2">
        Create Course
      </h1>
      <div className="courses-list">
        <form onSubmit={handleSubmit} className="form">
          <label
            htmlFor="email"
            className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
          >
            Course Title:
          </label>
          <input
            ref={titleRef}
            className="border-2 rounded-md shadow-md border-black p-1 mb-3"
            required
            type="text"
          />
          <label
            htmlFor="description"
            className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
          >
            Course Description:
          </label>
          <input
            className="border-2 rounded-md shadow-md border-black p-1 mb-4"
            ref={descriptionRef}
            required
            type="text"
          />
          <button
            type="submit"
            className="bg-secondary block hover:bg-orange-700 rounded-md px-3 py-1 text-white shadow-md"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCoursePage;

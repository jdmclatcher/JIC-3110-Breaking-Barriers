"use client";
import { useRef, useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserContext } from "@/contexts/UserContext";

const CreatePagesPage = ({ params }) => {
  const user = useContext(UserContext);
  const instructorId = user?.per_id;
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const courseTitle = searchParams.get("courseTitle");

  const titleRef = useRef();
  const contentRef = useRef();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pageData = {
      instructor_id: instructorId,
      course_id: courseId,
      page_title: titleRef.current.value,
      page_content: contentRef.current.value,
    };
    let response = await fetch("/api/page", {
      method: "POST",
      body: JSON.stringify(pageData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let responseData = await response.json();
    alert(responseData.message);
    if (responseData.status === 200) {
      router.push("/dashboard/courses");
    }
  };

  return (
    <div className="ml-5 mt-5">
      <div className="header">
        <Link
          className="m-5 flex-shrink-0 bg-secondary hover:bg-orange-700 border-secondary hover:border-orange-700 text-sm border-4 text-white py-1 px-2 rounded"
          href="/dashboard/courses"
        >
          Back to courses
        </Link>
        <h2 className="font-bold text-xl mx-5 my-2">Module: {courseTitle}</h2>
        <h1 className="font-bold text-lg mx-5 my-2">Create Page:</h1>
      </div>
      <div className="bg-gray-200 m-4 p-4 rounded-md">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="w-1/3">
            <label htmlFor="title-input">
              <p>Title:</p>
              <input
                className="title-input w-full rounded-md p-2 border-2 border-black shadow-md"
                ref={titleRef}
                required
                type="text"
              />
            </label>
          </div>

          <label htmlFor="content-label">
            <p>Content:</p>
            <textarea
              className="content-input w-full rounded-md px-1 h-60 p-1 border-2 border-black shadow-md"
              ref={contentRef}
              required
              type="text"
            />
          </label>
          <button className="bg-secondary rounded-md shadow-md px-2 py-1 my-2 hover:bg-orange-600">
            Create Page
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePagesPage;

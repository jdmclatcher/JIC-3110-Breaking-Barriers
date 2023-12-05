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
    <div>
      <div className="header">
        <h2>Module: {courseTitle}</h2>
        <h1>Create Page:</h1>
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
                className="title-input w-full rounded-md px-1"
                ref={titleRef}
                required
                type="text"
              />
            </label>
          </div>

          <label htmlFor="content-label">
            <p>Content:</p>
            <textarea
              className="content-input w-full rounded-md px-1"
              ref={contentRef}
              required
              type="text"
            />
          </label>
          <button>Create Page</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePagesPage;

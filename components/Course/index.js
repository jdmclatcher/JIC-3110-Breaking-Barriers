"use client";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { UserContext } from "@/contexts/UserContext";

const Course = ({ params, handleDelete }) => {
  const user = useContext(UserContext);
  const role = user?.role;
  const courseIdx = params.courseIdx;
  const courseTitle = params.courseTitle;
  const courseDesc = params.courseDesc;
  const courseId = params.courseId;

  const [pageList, setPageList] = useState([]);

  const getPages = async () => {
    let response = await fetch(`/api/page?course_id=${courseId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response) {
      console.error("No response from fetch");
      return;
    }
    let responseData = await response.json();
    if (!responseData || !responseData.pageList) {
      console.error("Invalid or empty response data");
      return;
    }
    const pages = responseData.pageList;
    setPageList(pages);
  };

  useEffect(() => {
    getPages();
  }, []);

  return (
    <div
      className="course-item bg-gray-100 rounded-lg p-5 m-5 border-4"
      key={`course-${courseIdx}`}
    >
      <div className="course-header border-b-2 pb-2 grid grid-cols-2">
        <div className="course-info ">
          <h2 className="course-title">{"Title: " + courseTitle}</h2>
          <p className="course-description">{"Description: " + courseDesc}</p>
        </div>

        <Link
          className="justify-self-end p-2 hover:underline"
          href={{
            pathname: "/dashboard/pages/create",
            query: {
              courseId: courseId,
              courseTitle: courseTitle,
            },
          }}
        >
          + Create Page
        </Link>
      </div>

      <div className="page-list grid grid-flow-row p-1">
        {pageList &&
          pageList.map((page, idx) => {
            return (
              <div className="page-item bg-white rounded-lg p-3 m-2 border-2">
                <Link
                  href={{
                    pathname: `/dashboard/pages/${page.page_id}`,
                  }}
                  className="hover:underline hover:text-amber-600"
                >
                  {page.title}
                </Link>
              </div>
            );
          })}
      </div>
      <div className="instructor-actions flex flex-row-reverse">
        <button
          className="py-1 px-2 bg-[#b91c1c] rounded-md self-end text-white hover:bg-[#dc2626]"
          onClick={() => {
            handleDelete(handleDelete(courseId));
          }}
        >
          Delete Course
        </button>
      </div>
    </div>
  );
};

export default Course;

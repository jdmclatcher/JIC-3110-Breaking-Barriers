"use client";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserContext } from "@/contexts/UserContext";
import { useSearchParams } from "next/navigation";

const PagesPage = ({ params }) => {
  const searchParams = useSearchParams();
  const user = useContext(UserContext);
  const [pageData, setPageData] = useState({});

  const pageId = params.pageId;

  if (user?.role === "trainee") {
    //view pages
  } else if (user?.role === "instructor") {
    //create pages
  }
  const getPageData = async () => {
    let response = await fetch(`/api/page/id?page_id=${pageId}`, {
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
    if (!responseData || !responseData.pageData) {
      console.error("Invalid or empty response data");
      return;
    }
    const data = responseData.pageData;
    setPageData(data[0]);
  };
  useEffect(() => {
    getPageData();
  }, []);

  return (
    <div className="pages-container">
      <Link
        className="absolute m-3 bg-secondary hover:bg-orange-700 bg-secondary hover:border-orange-700 text-sm border-4 text-white p-3 rounded-md"
        href="/dashboard"
      >
        Back to Dashboard
      </Link>
      <div className="page-content pt-5 flex flex-col">
        <div className="header">
          <h1 className="page-title mb-2 mt-20 pl-8 uppercase text-gray-700 text-4xl font-bold">
            {pageData.title}
          </h1>
        </div>
        <div className="page-body ml-20 mt-6">
          <p>{pageData.content}</p>
        </div>
      </div>
    </div>
  );
};

export default PagesPage;

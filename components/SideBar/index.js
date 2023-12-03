"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineFileMarkdown,
  AiOutlineFilePpt,
  AiOutlineFileText,
  AiOutlineFileUnknown,
  AiOutlineFolderOpen,
  AiOutlineHighlight,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineMessage,
} from "react-icons/ai";

const SideBar = ({ setModule }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [moduleList, setModuleList] = useState([]);
  const { data: session } = useSession();
  const user = session?.session?.user;

  // Route links
  const homeLink = "/dashboard";
  const modulesLink = homeLink + "/modules";
  const coursesLink = homeLink + "/courses";
  const pagesLink = homeLink + "/pages";
  const quizzesLink = homeLink + "/quizzes";
  const gradesLink = homeLink + "/quiz-stats";
  const filesLink = homeLink + "/files";
  const messagesLink = homeLink + "/messages";

  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    signOut();
  };

  const handleModuleChange = (e) => {
    e.preventDefault();
    setModule(e.target.value);
  };

  const getModules = async (user) => {
    if (!user?.role || user?.role === "admin") {
      return;
    }

    let urlString;
    if (user?.role === "trainee") {
      urlString = `/api/module/trainee?trainee_id=${user?.per_id}`;
    } else if (user?.role === "instructor") {
      urlString = `/api/module/instructor?instructor_id=${user?.per_id}`;
    } else {
      return;
    }

    let response = await fetch(urlString, {
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
    if (!responseData || !responseData.moduleList) {
      console.error("Invalid or empty response data");
      return;
    }
    setModuleList(responseData.moduleList);
  };

  useEffect(() => {
    getModules(user);
  }, [user]);

  return (
    <>
      {isOpen ? (
        <div className="sidebar top-0 bottom-0 lg:left-0 p-2 w-1/6 overflow-y-auto text-center bg-secondary">
          <div className="p-2.5 mt-1 flex items-center">
            <h1 className="font-bold text-gray-200 text-[15px] ml-3">
              Breaking Barriers
            </h1>
            <button
              className="ml-auto rounded-full p-2 duration-300 cursor-pointer hover:bg-primary"
              onClick={handleSideBar}
            >
              <AiOutlineArrowLeft />
            </button>
          </div>

          <div className="my-2 bg-gray-600 h-[1px]" />

          {(user?.role === "trainee" || user?.role == "instructor") && (
            <select
              className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-secondary hover:bg-primary w-full text-white"
              onChange={handleModuleChange}
            >
              <option
                className="text-[15px] ml-4 text-gray-200 font-bold float-right hover:bg-current"
                value=""
              >
                Modules
              </option>
              {moduleList.map((m) => {
                return (
                  <option key={m.module_id} value={m.module_id}>
                    {m.title}
                  </option>
                );
              })}
            </select>
          )}
          <Link
            href={homeLink}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
          >
            <AiOutlineHome className="text-white" size="20px" />
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Home
            </span>
          </Link>
          {user?.role === "admin" && (
            <Link
              href={modulesLink}
              className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
            >
              <AiOutlineFileMarkdown className="text-white" size="20px" />
              <span className="text-[15px] ml-4 text-gray-200 font-bold float-right">
                Modules
              </span>
            </Link>
          )}

          <Link
            href={coursesLink}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
          >
            <AiOutlineFileText className="text-white" size="20px" />
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Courses
            </span>
          </Link>
          <Link
            href={pagesLink}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
          >
            <AiOutlineFilePpt className="text-white" size="20px" />
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Pages
            </span>
          </Link>
          <Link
            href={quizzesLink}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
          >
            <AiOutlineFileUnknown className="text-white" size="20px" />
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Quizzes
            </span>
          </Link>
          <Link
            href={gradesLink}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
          >
            <AiOutlineHighlight className="text-white" size="20px" />
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Grades
            </span>
          </Link>
          <Link
            href={filesLink}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
          >
            <AiOutlineFolderOpen className="text-white" size="20px" />
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Files
            </span>
          </Link>
          <Link
            href={messagesLink}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
          >
            <AiOutlineMessage className="text-white" size="20px" />
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Messages
            </span>
          </Link>

          <div className="my-4 bg-gray-600 h-[1px]" />

          <button
            onClick={handleLogout}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary w-full"
          >
            <AiOutlineLogout className="text-white" size="20px" />
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Logout
            </span>
          </button>
        </div>
      ) : (
        <div className="sidebar top-0 bottom-0 lg:left-0 p-2 w-18 overflow-y-auto text-center bg-secondary">
          <div className="p-2.5 mt-1 flex items-center">
            <button
              className="rounded-full p-2 duration-300 cursor-pointer hover:bg-primary"
              onClick={handleSideBar}
            >
              <AiOutlineArrowRight />
            </button>
          </div>

          <div className="my-2 bg-gray-600 h-[1px]" />
          <Link
            href={homeLink}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
          >
            <AiOutlineHome className="text-white" size="20px" />
          </Link>

          {user?.role === "admin" && (
            <Link
              href={modulesLink}
              className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
            >
              <AiOutlineFileMarkdown className="text-white" size="20px" />
            </Link>
          )}
          <Link
            href={coursesLink}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
          >
            <AiOutlineFileText className="text-white" size="20px" />
          </Link>
          <Link
            href={pagesLink}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
          >
            <AiOutlineFilePpt className="text-white" size="20px" />
          </Link>
          <Link
            href={quizzesLink}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
          >
            <AiOutlineFileUnknown className="text-white" size="20px" />
          </Link>
          <Link
            href={gradesLink}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
          >
            <AiOutlineHighlight className="text-white" size="20px" />
          </Link>
          <Link
            href={filesLink}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
          >
            <AiOutlineFolderOpen className="text-white" size="20px" />
          </Link>
          <Link
            href={messagesLink}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
          >
            <AiOutlineMessage className="text-white" size="20px" />
          </Link>

          <div className="my-4 bg-gray-600 h-[1px]" />

          <button
            onClick={handleLogout}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary w-full"
          >
            <AiOutlineLogout className="text-white" size="20px" />
          </button>
        </div>
      )}
    </>
  );
};

export default SideBar;

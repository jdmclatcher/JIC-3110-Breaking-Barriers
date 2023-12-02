"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineFileMarkdown,
  AiOutlineFilePpt,
  AiOutlineFileText,
  AiOutlineFileUnknown,
  AiOutlineFolderOpen,
  AiOutlineHighlight,
  AiOutlineLogout,
  AiOutlineMessage,
} from "react-icons/ai";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modulesLink = "/dashboard/modules";
  const coursesLink = "/dashboard/courses";
  // CHANGE WHEN IMPLEMENTED
  const pagesLink = "/dashboard";
  const quizzesLink = "/dashboard/quizzes";
  const gradesLink = "/dashboard/quiz-stats";
  const filesLink = "/dashboard/files";
  // CHANGE WHEN IMPLEMENTED
  const messagesLink = "/dashboard";

  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    signOut();
  };

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

          <Link
            href={modulesLink}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
          >
            <AiOutlineFileMarkdown className="text-white" size="20px" />
            <span className="text-[15px] ml-4 text-gray-200 font-bold float-right">
              Modules
            </span>
            <svg
              className="-mr-1 h-5 w-5 text-white ml-auto"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </Link>
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
            href={modulesLink}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
          >
            <AiOutlineFileMarkdown className="text-white" size="20px" />
          </Link>
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

"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
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

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="sidebar top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-secondary">
      <div className="text-gray-100 text-xl">
        <div className="p-2.5 mt-1 flex items-center">
          <h1 className="font-bold text-gray-200 text-[15px] ml-3">
            Breaking Barriers
          </h1>
        </div>
      </div>

      <div className="my-2 bg-gray-600 h-[1px]" />

      <Link
        href="/dashboard/modules"
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
      >
        <AiOutlineFileMarkdown className="text-white" size="20px" />
        <span className="text-[15px] ml-4 text-gray-200 font-bold">
          Modules
        </span>
      </Link>
      <Link
        href="/dashboard/courses"
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
      >
        <AiOutlineFileText className="text-white" size="20px" />
        <span className="text-[15px] ml-4 text-gray-200 font-bold">
          Courses
        </span>
      </Link>
      <Link
        href="/dashboard/pages"
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
      >
        <AiOutlineFilePpt className="text-white" size="20px" />
        <span className="text-[15px] ml-4 text-gray-200 font-bold">Pages</span>
      </Link>
      <Link
        href="/dashboard/quizzes"
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
      >
        <AiOutlineFileUnknown className="text-white" size="20px" />
        <span className="text-[15px] ml-4 text-gray-200 font-bold">
          Quizzes
        </span>
      </Link>
      <Link
        href="/dashboard/quiz-stats"
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
      >
        <AiOutlineHighlight className="text-white" size="20px" />
        <span className="text-[15px] ml-4 text-gray-200 font-bold">Grades</span>
      </Link>
      <Link
        href="/dashboard/files"
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
      >
        <AiOutlineFolderOpen className="text-white" size="20px" />
        <span className="text-[15px] ml-4 text-gray-200 font-bold">Files</span>
      </Link>
      <Link
        href="/dashboard/messages"
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
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-primary"
      >
        <AiOutlineLogout className="text-white" size="20px" />
        <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
      </button>
    </div>
  );
};

export default SideBar;

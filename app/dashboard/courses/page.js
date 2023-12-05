"use client";
import InstructorCoursePage from "@/components/InstructorCoursePage";
import { useContext } from "react";
import { ModuleContext } from "@/contexts/ModuleContext";

const CoursesPage = () => {
  const moduleId = useContext(ModuleContext);

  if (!moduleId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="border-2 rounded-md p-3 shadow-md text-xl">
          Select a Module to get started.
        </div>
      </div>
    );
  }

  return <InstructorCoursePage />;
};

export default CoursesPage;

"use client";
import InstructorCoursePage from "@/components/InstructorCoursePage";
import { useContext } from "react";
import { ModuleContext } from "@/contexts/ModuleContext";
import { UserContext } from "@/contexts/UserContext";

const CoursesPage = () => {
  const moduleId = useContext(ModuleContext);
  const user = useContext(UserContext);

  if (user?.role === "admin") {
    return (
      <>
        <div>PLEASE REFACTOR FOR ADMIN</div>
        <InstructorCoursePage />
      </>
    );
  }

  if (!moduleId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="border-2 rounded-md p-3 shadow-md text-xl">
          Select a Module to get started.
        </div>
      </div>
    );
  }

  if (user?.role == "trainee") {
    return <div>Implement Trainee view here</div>;
  }
  return <InstructorCoursePage />;
};

export default CoursesPage;

"use client";
import { useContext, useEffect, useState } from "react";
import { ModuleContext } from "@/contexts/ModuleContext";
import { useSession } from "next-auth/react";

const DashboardPage = () => {
  const moduleId = useContext(ModuleContext);
  const { data: session } = useSession();
  const user = session?.session?.user;
  const [moduleData, setModuleData] = useState();

  const returnModule = () => {
    if (!moduleId) {
      if (user?.role === "admin") {
        return (
          <div className="border-2 rounded-md p-3 shadow-md text-xl">
            Welcome to the Lifecycle Building Training Application.
          </div>
        );
      }
      return (
        <div className="border-2 rounded-md p-3 shadow-md text-xl">
          Select a Module to get started.
        </div>
      );
    }
    return (
      <div className="border-2 rounded-md p-3 shadow-md flex flex-col">
        <span className="text-5xl">{moduleData?.title}</span>
        <span className="text-3xl">
          Instructor: {moduleData?.instructor_first_name}{" "}
          {moduleData?.instructor_last_name}
        </span>
        <p className="text-xl">Info: {moduleData?.details}</p>
      </div>
    );
  };

  const getModuleData = async () => {
    const res = await fetch(`/api/module/id?module_id=${moduleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setModuleData(data.moduleData);
  };

  useEffect(() => {
    if (moduleId) {
      getModuleData();
    }
  }, [moduleId]);

  return (
    <div className="flex justify-center items-center h-screen">
      {returnModule()}
    </div>
  );
};

export default DashboardPage;

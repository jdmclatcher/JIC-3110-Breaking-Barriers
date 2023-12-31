"use client";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { UserContext } from "@/contexts/UserContext";
import "./Modules.css";

const ModulesPage = () => {
  const [moduleList, setmoduleList] = useState([]);
  const user = useContext(UserContext);

  const getModules = async () => {
    const administrator_id = user?.per_id;
    let response = await fetch(
      `/api/module?administrator_id=${administrator_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response) {
      console.error("No response from fetch");
      return;
    }
    let responseData = await response.json();
    if (!responseData || !responseData.moduleList) {
      console.error("Invalid or empty response data");
      return;
    }
    setmoduleList(responseData.moduleList);
  };

  const handleDelete = async (module_id) => {
    let moduleData = { module_id: module_id };
    let response = await fetch("/api/module", {
      method: "DELETE",
      body: JSON.stringify(moduleData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      alert("Successfully deleted modules");
      getModules();
    } else if (response.status === 500) {
      alert("Failed to delete module");
    }
  };

  useEffect(() => {
    getModules();
  }, []);

  return (
    <div className="p-5">
      <h1 className="block uppercase tracking-wide text-gray-700 text-4xl text-center mt-10 font-bold mb-2">
        Modules
      </h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex">
        {moduleList.map((module, idx) => {
          return (
            <div
              className="module-item shadow-md"
              key={`module-${module.module_id}`}
            >
              <Link
                href={`/dashboard/modules/${module.module_id}`}
                className="block uppercase tracking-wide text-gray-700 text-m font-bold mb-2 hover:text-secondary"
              >
                {module.title}
              </Link>
              <p className="block uppercase tracking-wide text-gray-700 text-m mb-2">
                {module.details}
              </p>
              <button
                className="mt-10 shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded"
                onClick={() => {
                  handleDelete(module.module_id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <div className="mt-10">
        <Link
          className="m-5 bg-secondary hover:bg-orange-700 bg-secondary text-sm text-white p-3 rounded"
          href="/dashboard/modules/create"
        >
          Create New Module
        </Link>
      </div>
    </div>
  );
};

export default ModulesPage;

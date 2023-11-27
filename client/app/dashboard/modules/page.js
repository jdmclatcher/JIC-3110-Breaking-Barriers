"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "./Modules.css";

const ModulesPage = () => {
  const [moduleList, setmoduleList] = useState([]);
  const administrator_id = "admin1";

  const getmodules = async () => {
    let response = await fetch(
      `http://localhost:${process.env.NEXT_PUBLIC_SERVER_PORT}/module/get-administrator?administrator_id=${administrator_id}`,
      {
        method: "GET",
        mode: "cors",
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
    let response = await fetch(
      `http://localhost:${process.env.NEXT_PUBLIC_SERVER_PORT}/module/delete?module_id=${module_id}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      alert("Successfully deleted module");
      getmodules();
    } else if (response.status === 500) {
      alert("Failed to delete module");
    }
  };

  useEffect(() => {
    getmodules();
  }, []);

  return (
    <div className="modules-container">
      <Link href="/dashboard">Back to Dashboard</Link>
      <h1 className="modules-header">Modules</h1>
      <div className="modules-list">
        {moduleList.map((module, idx) => {
          return (
            <div className="module-item" key={`module-${idx}`}>
              <h2 className="module-title">{module.module_title}</h2>
              <p className="module-description">{module.module_details}</p>
              <button
                className="delete-module-button"
                onClick={() => {
                  handleDelete(module.module_id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
        <Link href="/dashboard/modules/create" className="create-module-button">
          Create module
        </Link>
      </div>
    </div>
  );
};

export default ModulesPage;

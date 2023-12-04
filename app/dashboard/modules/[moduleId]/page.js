"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const ModulePage = ({ params }) => {
  const moduleId = params.moduleId;
  const [traineeList, setTraineeList] = useState([]);
  const [moduleInfo, setModuleInfo] = useState(null);
  const [allTraineeList, setAllTraineeList] = useState([]);
  const traineeRef = useRef();

  const handleAssignTrainee = async (e) => {
    e.preventDefault();

    if (!traineeRef.current.value) {
      alert("Please select a trainee");
      return;
    }
    const assignData = {
      trainee_id: traineeRef.current.value,
      module_id: moduleId,
    };

    const response = await fetch("/api/module/assign", {
      method: "POST",
      body: JSON.stringify(assignData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    alert(responseData.message);
    getTrainees();
  };

  const getModuleInfo = async () => {
    const response = await fetch(`/api/module/id?module_id=${moduleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    setModuleInfo(responseData.moduleData);
  };

  const getTrainees = async () => {
    let response = await fetch(`/api/module/admin?module_id=${moduleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let responseData = await response.json();
    setTraineeList(responseData.moduleList);

    response = await fetch("/api/trainee", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    responseData = await response.json();
    setAllTraineeList(responseData.traineeList);
  };

  useEffect(() => {
    getModuleInfo();
    getTrainees();
  }, []);

  return (
    <div className="mt-5 ml-5 space-y-2">
      <Link
        href="/dashboard/modules"
        className="bg-secondary text-white text-md rounded-md px-3 py-2 hover:bg-primary shadow-md"
      >
        Back to Modules
      </Link>
      <h1 className="uppercase tracking-wide text-gray-700 text-3xl font-bold">
        {moduleInfo?.title}
      </h1>
      <h2 className="text-gray-700 text-xl">{moduleInfo?.details}</h2>
      <div className="border-2 rounded-md shadow-md p-3">
        <span className="font-bold">Trainees enrolled:</span>
        {traineeList ? (
          traineeList.map((m, idx) => {
            return (
              <p key={idx}>
                {m.trainee_first_name} {m.trainee_last_name}
              </p>
            );
          })
        ) : (
          <p>None</p>
        )}
      </div>

      <div className="border-2 rounded-md shadow-md p-3 flex flex-col">
        <span>Invite Trainees:</span>
        <select
          className="border-2 border-black rounded-md p-1"
          ref={traineeRef}
          required
        >
          <option value={""}>Select a Trainee</option>
          {allTraineeList &&
            allTraineeList.map((t, idx) => {
              return (
                <option key={idx} value={t.per_id}>
                  {t.first_name} {t.last_name}
                </option>
              );
            })}
        </select>
        <button
          className="bg-secondary rounded-md shadow-md py-1 my-2"
          onClick={handleAssignTrainee}
        >
          Assign Trainee
        </button>
      </div>
    </div>
  );
};

export default ModulePage;

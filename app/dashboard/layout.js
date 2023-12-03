"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { ModuleContext } from "@/contexts/ModuleContext";
import SideBar from "@/components/SideBar";

export default function DashboardLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [module, setModule] = useState(null);
  const [session, setSession] = useState(null);
  console.log(session);
  const router = useRouter();

  useEffect(() => {
    validateSession();
    getUser();
  }, []);

  const validateSession = async () => {
    const validSession = await checkSession();
    if (!validSession) {
      router.push("/");
    }

    setIsLoading(false);
  };

  const getUser = async () => {
    const res = await fetch("/api/auth/session", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await res.json();
    setSession(resData.session);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <SessionProvider session={session}>
        <div className="flex h-screen">
          <SideBar setModule={setModule} />
          <ModuleContext.Provider value={module}>
            <div className="w-full">{children}</div>
          </ModuleContext.Provider>
        </div>
      </SessionProvider>
    </main>
  );
}

const checkSession = async () => {
  try {
    const response = await fetch("/api/auth/session", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    return responseData?.session !== null;
  } catch (e) {
    return false;
  }
};

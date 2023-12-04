"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { ModuleContext } from "@/contexts/ModuleContext";
import SideBar from "@/components/SideBar";
import { UserContext } from "@/contexts/UserContext";
import Spinner from "@/components/Spinner";

export default function DashboardLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [module, setModule] = useState(null);
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null);
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
    setUserRole(resData?.session?.user);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main>
      <SessionProvider session={session}>
        <UserContext.Provider value={userRole}>
          <div className="flex h-screen">
            <SideBar setModule={setModule} />
            <ModuleContext.Provider value={module}>
              <div className="w-full max-h-full overflow-auto">{children}</div>
            </ModuleContext.Provider>
          </div>
        </UserContext.Provider>
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

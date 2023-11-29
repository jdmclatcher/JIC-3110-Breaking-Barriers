"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({ children }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const validSession = await checkSession();
      if (!validSession) {
        router.push("/");
      }

      setIsSuccess(true);
    })();
  }, []);

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <SessionProvider>
      <main>{children}</main>
    </SessionProvider>
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

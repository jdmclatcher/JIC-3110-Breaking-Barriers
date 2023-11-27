"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();
      if (error) {
        router.push("/");
      }

      setIsSuccess(true);
    })();
  }, []);

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  return <main>{children}</main>;
}

const getUser = async () => {
  try {
    const response = await fetch("/api/auth/check", { method: "GET" });
    if (response.status !== 200) {
      return { user: null, error: true };
    }

    return {
      user: response,
      error: null,
    };
  } catch (e) {
    return {
      user: null,
      error: e,
    };
  }
};

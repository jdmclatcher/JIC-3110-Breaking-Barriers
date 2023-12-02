"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const DashboardPage = () => {
  const { data: session } = useSession();
  console.log(session);
  const router = useRouter();
  const handleSignOut = async () => {
    signOut();
  };

  return (
    <div>
      Welcome to Breaking barriers. Please select a module to get started. TODO:
      STYLE ME AND ADD CONTENT
    </div>
  );
};

export default DashboardPage;

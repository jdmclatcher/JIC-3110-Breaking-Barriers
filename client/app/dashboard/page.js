import React from "react";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard Page</h1>
      <Link href="/dashboard/create-quiz">Create Quiz</Link>
      <Link href="/dashboard/quiz-results">Quiz Results</Link>
      <Link href="/dashboard/quiz-stats">Quiz Stats</Link>
    </div>
  );
}

export default DashboardPage;
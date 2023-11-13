'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { supabase } from "@/supabase/supabaseClient";
const DashboardPage = () => {
  const [userRole, setUserRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
            .from('profiles') // Replace with your table name
            .select('role')   // Replace with your role column name
            .eq('id', user.id)
            .single();

        if (error) {
          console.error("Error fetching user role:", error);
        } else {
          setUserRole(data.role);
        }
      }
    };
    fetchUserRole();
  }, []);

  return (
    <div className='bg-gradient-to-r from-gray-400 to-gray-300 h-screen flex flex-col'>
      <h1 className='h-screen text-lg font-bold bg-gradient-to-r from-gray-500 to-gray-400 w-1/4 p-2'>Dashboard Page
        <Link className="items-center justify-center inline-block bg-gradient-to-r rounded-lg from-orange-500 to-orange-400 flex flex-col mt-5 w-full h-32 pt-2.5 text-md font-medium uppercase leading-normal text-primary-700" 
              href="/dashboard/create-quiz">Create Quiz</Link>
        <Link className="items-center justify-center inline-block bg-gradient-to-r rounded-lg from-orange-500 to-orange-400 flex flex-col mt-5 w-full h-32 pt-2.5 text-md font-medium uppercase leading-normal text-primary-700" 
              href="/dashboard/quiz-results">Quiz Results</Link>
        <Link className="items-center justify-center inline-block bg-gradient-to-r rounded-lg from-orange-500 to-orange-400 flex flex-col mt-5 w-full h-32 pt-2.5 text-md font-medium uppercase leading-normal text-primary-700" 
              href="/dashboard/quiz-stats">Quiz Stats</Link>
        <Link className="items-center justify-center inline-block bg-gradient-to-r rounded-lg from-orange-500 to-orange-400 flex flex-col mt-5 w-full h-32 pt-2.5 text-md font-medium uppercase leading-normal text-primary-700" 
              href="/dashboard/quizzes">Quizzes</Link>
        <Link className="items-center justify-center inline-block bg-gradient-to-r rounded-lg from-orange-500 to-orange-400 flex flex-col mt-5 w-full h-32 pt-2.5 text-md font-medium uppercase leading-normal text-primary-700" 
              href="/dashboard/files">Files</Link>
        {userRole === 'administrator' && (
            <Link className="items-center justify-center inline-block bg-gradient-to-r rounded-lg from-orange-500 to-orange-400 flex flex-col mt-5 w-full h-32 pt-2.5 text-md font-medium uppercase leading-normal text-primary-700"
                  href="/dashboard/uploadFiles">Upload Files</Link>

        )}
      </h1>
    </div>
  );
}

export default DashboardPage;

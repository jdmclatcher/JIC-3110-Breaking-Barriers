'use client';
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const CreateCoursePage = () => {
    const [moduleList, setModuleList] = useState([]);
    const router = useRouter();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const moduleRef = useRef();
    console.log(moduleList);


    const handleSubmit = async () => {
        const courseData = {
            instructor_id: "instructor1",
            module_id: moduleRef.current.value,
            course_title: titleRef.current.value,
            course_description: descriptionRef.current.value,
        }
        let response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_SERVER_PORT}/course/create`, {
            method: 'POST',
            body: JSON.stringify(courseData),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            alert("Course created successfully");
            router.push('/dashboard');
        } else if (response.status === 500) {
            alert("Failed to create course");
        }
    }

    const getModules = async () => {
        const administrator_id = "admin1";

        let response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_SERVER_PORT}/module/get-administrator?administrator_id=${administrator_id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response) {
            console.error('No response from fetch');
            return;
        }
        let responseData = await response.json();
        if (!responseData || !responseData.moduleList) {
            console.error('Invalid or empty response data');
            return;
        }
        setModuleList(responseData.moduleList);
    }

    useEffect(() => {
        getModules();
    }, [])

    return (
        <div className="courses-container">
            <Link href="/dashboard">Back to Dashboard</Link>
            <div>
                <Link href="/dashboard/courses">Back to Courses</Link>
            </div>
            <h1 className="courses-header">Create Course</h1>
            <div className="courses-list">
                <form onSubmit={handleSubmit} className="form">
                    <label htmlFor="email">
                        <p>Course Title</p>
                        <input ref={titleRef} required type="text" />
                    </label>
                    <label htmlFor="password">
                        <p>Course Description</p>
                        <input ref={descriptionRef} required type="text" />
                    </label>
                    <label htmlFor="module">
                        <p>Module</p>
                        <select ref={moduleRef} required type="text">
                            <option value="">Select Below</option>
                            {moduleList.map((module) => {
                                return (
                                    <option value={module.module_id}>{module.module_title}</option>
                                );
                            })}
                        </select>
                    </label>
                    <div>
                        <button type="submit">Create Course</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateCoursePage;
'use client';
import { useRef } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const CreateCoursePage = () => {
    const router = useRouter();
    const titleRef = useRef();
    const descriptionRef = useRef();


    const handleSubmit = async () => {
        const courseData = {
            instructor_id: "instructor1",
            module_id: 1,
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
                    <button type="submit">Create Course</button>
                </form>
            </div>
        </div>
    );
}

export default CreateCoursePage;

'use client';
import { useRef } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const CreateModulePage = () => {
    const router = useRouter();
    const titleRef = useRef();
    const descriptionRef = useRef();


    const handleSubmit = async () => {
        const moduleData = {
            administrator_id: "administrator1",
            module_id: 1,
            module_title: titleRef.current.value,
            module_description: descriptionRef.current.value,
        }
        let response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_SERVER_PORT}/module/create`, {
            method: 'POST',
            body: JSON.stringify(moduleData),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            alert("module created successfully");
            router.push('/dashboard');
        } else if (response.status === 500) {
            alert("Failed to create module");
        }
    }

    return (
        <div className="modules-container">
            <Link href="/dashboard">Back to Dashboard</Link>
            <div>
                <Link href="/dashboard/modules">Back to Modules</Link>
            </div>
            <h1 className="modules-header">Create Module</h1>
            <div className="modules-list">
                <form onSubmit={handleSubmit} className="form">
                    <label htmlFor="email">
                        <p>Module Title</p>
                        <input ref={titleRef} required type="text" />
                    </label>
                    <label htmlFor="password">
                        <p>Module Description</p>
                        <input ref={descriptionRef} required type="text" />
                    </label>
                    <button type="submit">Create Module</button>
                </form>
            </div>
        </div>
    );
}

export default CreateModulePage;

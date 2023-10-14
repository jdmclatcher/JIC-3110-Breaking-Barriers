'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateAccount = () => {
    const router = useRouter();
    const navigateToHome = () => {
        router.push("/",  { scroll: false });
    }

    const [userData, setUserData] = useState({
        userType: 'admin',
        email: '',
        firstName:'',
        lastName:'',
        username: '',
        password: '',
        confirmPassword: '',
        traineeInstructorId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
          ...prevState,
          [name]: value
        }));
    };

    const createAccount = async (e) => {
        e.preventDefault();
        console.log(userData);
        if (userData.password !== userData.confirmPassword) {
            alert('Passwords do not match!');
        } else {
            let data = {
                userType: userData.userType,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                username: userData.username,
                password: userData.password,
                traineeInstructorId: userData.traineeInstructorId
            }
            let response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_SERVER_PORT}/account/create-account`, {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(data),
                    headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                alert("User Created");
            } else if (response.status === 500) {
                alert("Failed to create user");
            }
        }
    }

    const handleAccountTypeChange = (e) => {
        setUserData(prevState => ({
            ...prevState,
            userType: e.target.value
        }))
    }

    return (
        <div className='bg-gradient-to-r from-gray-400 to-gray-300 h-screen flex justify-center items-center'>

            <div className='bg-gradient-to-r from-orange-400 to-orange-400 rounded-lg h-5/6 w-1/3 p-5 flex flex-col'>
                <button 
                className='inline-block  rounded-full bg-gradient-to-r from-orange-500 to-orange-500 fw-5/6 px-3 pb-1 pt-2.5 text-md font-medium uppercase leading-normal text-primary-700'
                onClick={navigateToHome}>Back to Home</button>
                <div className='justify-center items-center p-4 h-5/6 items-center'>
                    <div>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>User Type: </label>
                        <select
                            className = "bg-gray-50 mb-5 border border-gray-300 text-gray-600 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-orange-300 dark:placeholder-gray-400"
                            onChange={(e) => handleAccountTypeChange(e)}
                            required
                            value={userData.userType}
                        >
                            <option value="admin">Administrator</option>
                            <option value="instructor">Instructor</option>
                            <option value="trainee">Trainee</option>
                        </select>
                    </div>
                    <div>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                            Email: 
                        </label>
                        <input
                            className = "bg-gray-50 mb-5 border border-gray-300 text-gray-600 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-orange-300 dark:placeholder-gray-400"
                            type="text" 
                            name="email" 
                            value={userData.email} 
                            onChange={handleChange}
                         />
                    </div>
                    {userData.userType === 'trainee' && 
                    <div>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Instructor Username: </label>
                        <input 
                            className = "bg-gray-50 mb-5 border border-gray-300 text-gray-600 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-orange-300 dark:placeholder-gray-400"
                            type="text" 
                            name="traineeInstructorId" 
                            value={userData.traineeInstructorId} 
                            onChange={handleChange} />
                    </div>}
                    <div>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>First Name: </label>
                        <input 
                            className = "bg-gray-50 mb-5 border border-gray-300 text-gray-600 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-orange-300 dark:placeholder-gray-400"
                            type="text" 
                            name="firstName" 
                            value={userData.firstName} 
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Last Name: </label>
                        <input 
                            className = "bg-gray-50 mb-5 border border-gray-300 text-gray-600 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-orange-300 dark:placeholder-gray-400"
                            type="text" 
                            name="lastName" 
                            value={userData.lastName} 
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Username: </label>
                        <input 
                            className = "bg-gray-50 mb-5 border border-gray-300 text-gray-600 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-orange-300 dark:placeholder-gray-400"
                            type="text" 
                            name="username" 
                            value={userData.username} 
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Password: </label>
                        <input
                            className = "bg-gray-50 mb-5 border border-gray-300 text-gray-600 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-orange-300 dark:placeholder-gray-400"
                            type="password" 
                            name="password" 
                            value={userData.password} 
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Confirm Password: </label>
                        <input 
                        className = "bg-gray-50 mb-5 border border-gray-300 text-gray-600 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-orange-300 dark:placeholder-gray-400"
                        type="password" 
                        name="confirmPassword" 
                        value={userData.confirmPassword} 
                        onChange={handleChange} />
                    </div>
                    <div>
                        <button className='inline-block flex justify-center rounded-full bg-gradient-to-r from-orange-500 to-orange-500 fw-5/6 px-3 pb-1 pt-1 text-md font-medium uppercase leading-normal text-primary-700' onClick={createAccount}>Create Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateAccount;

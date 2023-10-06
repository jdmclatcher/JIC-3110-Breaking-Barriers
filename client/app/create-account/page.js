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
        <div>
            <button onClick={navigateToHome}>Back to Home</button>
            <div style={{ padding: '20px', width: '400px', border: '1px solid gray', borderRadius: '5px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label>User Type: </label>
                    <select
                        onChange={(e) => handleAccountTypeChange(e)}
                        required
                        value={userData.userType}
                    >
                        <option value="admin">Administrator</option>
                        <option value="instructor">Instructor</option>
                        <option value="trainee">Trainee</option>
                    </select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Email: </label>
                    <input type="text" name="email" value={userData.email} onChange={handleChange} />
                </div>
                {userData.userType === 'trainee' && 
                <div style={{ marginBottom: '10px' }}>
                    <label>Instructor Username: </label>
                    <input type="text" name="traineeInstructorId" value={userData.traineeInstructorId} onChange={handleChange} />
                </div>}
                <div style={{ marginBottom: '10px' }}>
                    <label>First Name: </label>
                    <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Last Name: </label>
                    <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Username: </label>
                    <input type="text" name="username" value={userData.username} onChange={handleChange} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Password: </label>
                    <input type="password" name="password" value={userData.password} onChange={handleChange} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Confirm Password: </label>
                    <input type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <button onClick={createAccount}>Create Account</button>
                </div>
            </div>
        </div>
    );
}

export default CreateAccount;

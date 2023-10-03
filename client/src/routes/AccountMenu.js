import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
const UserProfile = () => {
    const [userData, setUserData] = useState({
        username: 'JohnDoe123',
        email: 'johndoe@example.com',
        password: '******'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
    }


    return (
        <div style={{ padding: '20px', width: '300px', border: '1px solid gray', borderRadius: '5px' }}>
            <button onClick={navigateToHome}>Back to Home</button>
            <h2>User Profile</h2>

            <div style={{ marginBottom: '10px' }}>
                <label>Username: </label>
                <input type="text" name="username" value={userData.username} onChange={handleChange} />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>Password: </label>
                <input type="password" name="password" value={userData.password} onChange={handleChange} />
            </div>

            <div style={{ marginTop: '20px' }}>
                <button>Save Changes</button>
            </div>
        </div>
    );
}

export default UserProfile;
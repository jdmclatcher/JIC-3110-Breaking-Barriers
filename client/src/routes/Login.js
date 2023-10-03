import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const navigate = useNavigate();
    const navigateToHome = () => {
        // need logic to check credentials
        navigate('/');
    }

    const navigateToBlank = () => {
        // need logic to check credentials
        navigate('/blank');
    }

    return (
        <div style={{ padding: '20px', width: '300px', border: '1px solid gray', borderRadius: '5px' }}>
            <h2>Login</h2>

            <div style={{ marginBottom: '10px' }}>
                <label>Email: </label>
                <input type="email" name="email" value={loginData.email} onChange={handleChange} />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>Password: </label>
                <input type="password" name="password" value={loginData.password} onChange={handleChange} />
            </div>

            <div style={{ marginTop: '20px' }}>
                <button onClick={navigateToBlank}>Login</button>
            </div>
        </div>
    );
}

export default Login;

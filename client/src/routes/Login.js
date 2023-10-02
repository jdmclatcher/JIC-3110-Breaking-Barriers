import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../firebaseAuth'; // Import the login function from your Firebase authentication service


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async () => {
        const { email, password } = formData;

        try {
            await login(email, password); // Call your login function
            // Redirect to the desired page after successful login
            navigate('/profile'); // Change '/profile' to the route you want to redirect to after login
        } catch (error) {
            // Handle login errors (e.g., show error message to the user)
            console.error('Login error:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
            </div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;

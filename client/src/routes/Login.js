import React, { useState } from 'react';
<<<<<<< Updated upstream
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
=======
import firebase from './path/to/firebase'; // make sure to provide the correct path

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            // Redirect to home or dashboard page after successful login
        } catch (error) {
            setError(error.message);
>>>>>>> Stashed changes
        }
    };

    return (
        <div>
            <h2>Login</h2>
<<<<<<< Updated upstream
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
=======
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
>>>>>>> Stashed changes
        </div>
    );
};

export default Login;

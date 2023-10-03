import { useState, useRef } from "react";
import "./AccountForm.css"

const AccountForm = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        email: '',
        confirmPassword: '',
    });

    const [isLogin, setIsLogin] = useState(true);
    const toggleIsLogin = () => {
        setIsLogin(!isLogin);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
          ...prevState,
          [name]: value
        }));
    };

    const submitUser = async (e) => {
        e.preventDefault();
        if (isLogin) {
            // Login to an account
            let loginInfo = {
            username: userData.username,
            password: userData.password,
            }
            alert('login not yet implemented');
        } else {
            // Sign up an account
            let signupInfo = {
                email: userData.email,
                username: userData.username,
                password: userData.password,
            }
            let response = await fetch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/account/create_account`, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(signupInfo),
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

    return (
        <div style={{ padding: '20px', width: '400px', border: '1px solid gray', borderRadius: '5px' }}>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            {!isLogin && (
                <div style={{ marginBottom: '10px' }}>
                <label>Email: </label>
                <input type="text" name="email" value={userData.email} onChange={handleChange} />
                </div>
            )}
            <div style={{ marginBottom: '10px' }}>
                <label>Username: </label>
                <input type="text" name="username" value={userData.username} onChange={handleChange} />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>Password: </label>
                <input type="password" name="password" value={userData.password} onChange={handleChange} />
            </div>
            {!isLogin && (
                <div style={{ marginBottom: '10px' }}>
                <label>Confirm Password: </label>
                <input type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} />
                </div>
            )}
            <div style={{ marginTop: '20px' }}>
                <button onClick={submitUser}>{isLogin ? 'Login' : 'Sign Up'}</button>
            </div>
            <button onClick={toggleIsLogin}>{isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}</button>
        </div>
    )
}

export default AccountForm
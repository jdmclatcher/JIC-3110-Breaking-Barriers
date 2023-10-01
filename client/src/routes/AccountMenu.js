import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase'; // Import the Firebase authentication object
import { register, login } from './firebaseAuth'; // Import your Firebase authentication functions

const UserProfile = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
    };

    const handleSaveChanges = async () => {
        try {
            // Get the currently logged-in user
            const user = auth.currentUser;

            // Update user profile data (in this example, only username)
            await user.updateProfile({
                displayName: userData.username,
            });

            // You can also update user data in Firestore here if needed

            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    useEffect(() => {
        // Check if a user is logged in
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                // If no user is logged in, navigate back to the login page
                navigateToHome();
            } else {
                // Populate the component's state with the user's data (e.g., username)
                setUserData({ username: user.displayName || '', password: '' });
            }
        });

        return () => {
            // Unsubscribe from the Firebase auth observer when the component unmounts
            unsubscribe();
        };
    }, []);

    return (
        <div style={{ padding: '20px', width: '300px', border: '1px solid gray', borderRadius: '5px' }}>
            <button onClick={navigateToHome}>Back to Home</button>
            <h2>User Profile</h2>

            <div style={{ marginBottom: '10px' }}>
                <label>Username: </label>
                <input type="text" name="username" value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>Password: </label>
                <input type="password" name="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
            </div>

            <div style={{ marginTop: '20px' }}>
                <button onClick={handleSaveChanges}>Save Changes</button>
            </div>
        </div>
    );
};

export default UserProfile;

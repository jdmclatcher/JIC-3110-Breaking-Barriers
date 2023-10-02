import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import firebase from './path/to/firebase'; // make sure to provide the correct path

const UserProfile = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUserData({
                    username: user.displayName,
                    email: user.email,
                    password: '******'
                });
            }
        });
        return () => unsubscribe();
    }, []);

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    };

    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
    }

    // rest of the code remains the same

    return (
        <div style={{ padding: '20px', width: '300px', border: '1px solid gray', borderRadius: '5px' }}>
            <button onClick={navigateToHome}>Back to Home</button>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
            {/* rest of the code remains the same */}
        </div>
    );
}

export default UserProfile;

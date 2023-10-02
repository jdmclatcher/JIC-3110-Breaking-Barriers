import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css'; // Import your CSS file

const UserProfile = () => {
  const [userData, setUserData] = useState({
    username: 'JohnDoe123',
    email: 'johndoe@example.com',
    password: '******',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <div className="user-profile-container">
      <button className="back-button" onClick={navigateToHome}>
        Back to Home
      </button>
      <h2 className="user-profile-header">User Profile</h2>

      <div className="input-container">
        <label className="input-label">Username:</label>
        <input
          className="input-field"
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
        />
      </div>

      <div className="input-container">
        <label className="input-label">Password:</label>
        <input
          className="input-field"
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
      </div>

      <div className="button-container">
        <button className="save-button">Save Changes</button>
      </div>
    </div>
  );
};

export default UserProfile;

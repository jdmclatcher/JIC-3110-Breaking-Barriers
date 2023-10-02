import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AccountForm from "../components/AccountForm";

const UserProfile = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate('/');
  }

  return (
    <div>
      <button onClick={navigateToHome}>Back to Home</button>
      <AccountForm/>   
    </div>
  );
}

export default UserProfile;

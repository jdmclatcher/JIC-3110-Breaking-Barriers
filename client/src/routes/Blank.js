import React from "react";
import { useNavigate } from "react-router-dom";

const Blank = () => {
    const navigate = useNavigate();

    const navigateToHome = () => {
        // need logic to check credentials
        navigate('/');
    }

    return (
        <div className="blank-container">
            <div>Success</div>
            <button onClick={navigateToHome}>Back to Home</button>
        </div>
    );
}

export default Blank;
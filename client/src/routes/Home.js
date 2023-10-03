import React from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();

    const navigateToCreateQuiz = () => {
        navigate('/create-quiz');
    }

    const navigateToAccountMenu = () => {
        navigate('/account-menu');
    }

    const navigateToLoginMenu = () => {
        navigate('/login');
    }

    return (
        <div className="home-container">
            <div>Home</div>
            <button onClick={navigateToCreateQuiz}>Create Quiz</button>
            <button onClick={navigateToAccountMenu}>Account Menu</button>
            <button onClick={navigateToLoginMenu}>Login</button>
        </div>
    );
}

export default Home;

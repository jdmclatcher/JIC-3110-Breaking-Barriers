import React from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();

    const navigateToCreateQuiz = () => {
        navigate('/create-quiz');
    }

    return (
        <div className="home-container">
            <div>Home</div>
            <button onClick={navigateToCreateQuiz}>Create Quiz</button>
        </div>
    );
}

export default Home;

import React, { useState, useEffect } from 'react';

const TakeQuiz = () => {
    const [quizData, setQuizData] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});

    useEffect(() => {
        // Fetch the quiz data from the server
        fetch('/api/quiz')
            .then(response => response.json())
            .then(data => setQuizData(data));
    }, []);

    const handleAnswer = (questionId, answer) => {
        setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const handleSubmit = () => {
        // Send the userAnswers to the server for evaluation
        fetch('/api/submit-quiz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userAnswers),
        })
            .then(response => response.json())
            .then(result => {
                // Show the quiz results to the user
                alert(`Your score is: ${result.score}`);
            });
    };

    return (
        <div>
            {quizData.map(question => (
                <div key={question.id}>
                    <p>{question.text}</p>
                    {question.options.map(option => (
                        <label key={option.id}>
                            <input
                                type="radio"
                                name={question.id}
                                value={option.id}
                                onChange={() => handleAnswer(question.id, option.id)}
                            />
                            {option.text}
                        </label>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit Quiz</button>
        </div>
    );
};

export default TakeQuiz;

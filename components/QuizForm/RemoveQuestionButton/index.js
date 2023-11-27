import React from "react";
import "./RemoveQuestionButton.css";

const RemoveQuestionButton = ({ questionList, setQuestionList, idx }) => {
    const removeQuestion = () => {
        let filteredQuestionList = questionList.filter((_, i) => i !== idx);
        setQuestionList(filteredQuestionList);
    }

    return (
        <button className="remove-question-button" type="button" onClick={removeQuestion}>x</button>
    )
}

export default RemoveQuestionButton;

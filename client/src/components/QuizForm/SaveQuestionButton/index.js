import React from "react";
import "./SaveQuestionButton.css"

const SaveQuestionButton = ({ questionList, setQuestionList, questionText, questionType, optionsList, idx }) => {
    const handleSaveQuestion = () => {
        if (questionText === "" || questionType === "") {
            alert("Error: Fill out all Fields");
            return;
        } else if ((questionType === "multiple_choice" || questionType === "select_all") && optionsList.length <= 1) {
            alert("Error: Need at least 2 options");
            return;
        }

        let newQuestionList = [...questionList];
        newQuestionList[idx] = {
            questionText: questionText,
            questionType: questionType,
            options: optionsList
        };
        setQuestionList(newQuestionList);
    }

    return (
        <button className="save-question-button" type="button" onClick={handleSaveQuestion}>Save</button>
    )
}

export default SaveQuestionButton;

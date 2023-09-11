import React from "react";
import "./AddQuestionButton.css"

const AddQuestionButton = ({ questionList, setQuestionList }) => {
    const addQuestion = () => {
        setQuestionList([
            ...questionList,
            { 
                questionText:  "",
                questionType: "",
                options: [],
            }
        ])
    }

    return (
        <button className="add-question-button" type="button" onClick={addQuestion}>+</button>
    )
}

export default AddQuestionButton;

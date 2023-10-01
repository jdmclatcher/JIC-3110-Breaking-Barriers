import React from "react";
import "./AddQuestionButton.css"

const AddQuestionButton = ({ questionList, setQuestionList }) => {
    const addQuestion = () => {
        setQuestionList([
            ...questionList,
            { 
                question_text:  "",
                question_type: "",
                options: [],
            }
        ])
    }

    return (
        <button className="add-question-button" type="button" onClick={addQuestion}>+</button>
    )
}

export default AddQuestionButton;

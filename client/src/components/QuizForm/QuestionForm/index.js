import { useState, useRef } from "react";
import OptionsForm from "../OptionsForm";
import RemoveQuestionButton from "../RemoveQuestionButton";
import SaveQuestionButton from "../SaveQuestionButton";
import "./QuestionForm.css"

const QuestionForm = ({ questionList, setQuestionList, idx }) => {
    const prevQuestionData = questionList[idx];
    const prevQuestionText = prevQuestionData.questionText;
    const prevQuestionType = prevQuestionData.questionType;
    const prevOptionsList = prevQuestionData.options;
    const [questionText, setQuestionText] = useState(prevQuestionText);
    const [questionType, setQuestionType] = useState(prevQuestionType);
    const [optionsList, setOptionsList] = useState(prevOptionsList)

    const handleQuestionTypeChange = (e) => {
        setQuestionType(e.target.value);
    }

    return (
        <div className="question-form-container">
            <h3>{idx + 1}</h3>
            <div className="question-data-container">
                <label>Question Text:</label>
                <input
                    required
                    onChange={e => setQuestionText(e.target.value)}
                />

                <label>Question Type:</label>
                <select
                    onChange={handleQuestionTypeChange}
                    required
                >
                    <option value="">Select Below</option>
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="select_all">Select All</option>
                    <option value="free_response">Free Response</option>
                </select>
                <RemoveQuestionButton
                    questionList={questionList}
                    setQuestionList={setQuestionList}
                    idx={idx}
                />
            </div>
            <OptionsForm
                questionType={questionType}
                optionsList={optionsList}
                setOptionsList={setOptionsList}
            />
            <SaveQuestionButton
                questionList={questionList}
                setQuestionList={setQuestionList}
                questionText={questionText}
                questionType={questionType}
                optionsList={optionsList}
                idx={idx}
            />
        </div>
    )
}

export default QuestionForm;

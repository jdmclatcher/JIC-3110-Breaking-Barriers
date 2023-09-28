import { useState, useRef } from "react";
import OptionsForm from "../OptionsForm";
import RemoveQuestionButton from "../RemoveQuestionButton";
import "./QuestionForm.css"

const QuestionForm = ({ questionList, questionData, setQuestionList, idx }) => {
    const prevQuestionText = questionData.questionText;
    const prevQuestionType = questionData.questionType;
    const prevOptionsList = questionData.options;
    const [optionsList, setOptionsList] = useState(prevOptionsList);

    const handleQuestionTextChange = (e) => {
        let newQuestionList = [...questionList];
        newQuestionList[idx] = {
            questionText:  e.target.value,
            questionType: questionList[idx].questionType,
            options: optionsList,
        }
        setQuestionList(newQuestionList);
    }

    const handleQuestionTypeChange = (e) => {
        let newQuestionList = [...questionList];
        newQuestionList[idx] = {
            questionText:  questionList[idx].questionText,
            questionType: e.target.value,
            options: optionsList,
        }
        setQuestionList(newQuestionList);
    }

    return (
        <div className="question-form-container">
            <h3>{idx + 1}</h3>
            <div className="question-data-container">
                <label>Question Text:</label>
                <input
                    required
                    onChange={(e) => handleQuestionTextChange(e)}
                    value={prevQuestionText}
                />

                <label>Question Type:</label>
                <select
                    onChange={(e) => handleQuestionTypeChange(e)}
                    required
                    value={prevQuestionType}
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
                questionType={questionList[idx].questionType}
                optionsList={optionsList}
                questionList={questionList}
                setQuestionList={setQuestionList}
                questionIdx={idx}
                setOptionsList={setOptionsList}
            />
        </div>
    )
}

export default QuestionForm;

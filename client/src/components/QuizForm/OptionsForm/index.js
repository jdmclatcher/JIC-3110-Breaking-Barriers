import { useState } from "react";
import AddOptionButton from "./AddOptionButton";
import "./OptionsForm.css"

const OptionsForm = ({ questionType, optionsList, questionList, setQuestionList, questionIdx, setOptionsList }) => {

    const handleRemoveOption = (idx) => {
        let filteredOptionsList = optionsList.filter((_, i) => i !== idx);
        setOptionsList(filteredOptionsList);
        let newQuestionList = [...questionList];
        newQuestionList[questionIdx] = {
            questionText:  questionList[questionIdx].questionText,
            questionType: questionList[questionIdx].questionType,
            options: filteredOptionsList,
        }
        setQuestionList(newQuestionList);
    }

    const handleOptionText = (e, idx) => {
        let newOptionsList = [...optionsList];
        newOptionsList[idx] = {
            optionText: e.target.value,
            isCorrect: optionsList[idx].isCorrect,
        }
        setOptionsList(newOptionsList);
        let newQuestionList = [...questionList];
        newQuestionList[questionIdx] = {
            questionText:  questionList[questionIdx].questionText,
            questionType: questionList[questionIdx].questionType,
            options: newOptionsList,
        }
        setQuestionList(newQuestionList);
    }

    const handleCorrectOption = (e, idx) => {
        let newOptionsList = [...optionsList];
        newOptionsList[idx] = {
            optionText: optionsList[idx].optionText,
            isCorrect: e.target.checked,
        }
        setOptionsList(newOptionsList);
        let newQuestionList = [...questionList];
        newQuestionList[questionIdx] = {
            questionText:  questionList[questionIdx].questionText,
            questionType: questionList[questionIdx].questionType,
            options: newOptionsList,
        }
        setQuestionList(newQuestionList);
    }

    if (!questionType || questionType === "free_response") {
        return;
    }

    return (
        <>
            {optionsList.map(({ optionText, isCorrect }, idx) => {
                return (
                    <div>
                        <label>Option Text:</label>
                        <input onChange={(e) => handleOptionText(e, idx)} type="text" required value={optionText} />

                        <label>Is Correct:</label>
                        <input onChange={(e) => handleCorrectOption(e, idx)} type="checkbox" value={isCorrect} />

                        <button className="remove-option-button" type="button" onClick={() => handleRemoveOption(idx)}>x</button>
                    </div>
                )
            })}
            <AddOptionButton optionsList={optionsList} setOptionsList={setOptionsList} questionList={questionList} setQuestionList={setQuestionList} questionIdx={questionIdx} />
        </>
    )
}

export default OptionsForm;

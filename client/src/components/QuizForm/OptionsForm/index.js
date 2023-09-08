import { useState } from "react";
import AddOptionButton from "./AddOptionButton";
import "./OptionsForm.css"

const OptionsForm = ({ questionType, optionsList, setOptionsList }) => {

    const handleRemoveOption = (idx) => {
        let filteredOptionsList = optionsList.filter((_, i) => i !== idx);
        setOptionsList(filteredOptionsList);
    }

    const handleOptionText = (e, idx) => {
        let newOptionsList = [...optionsList];
        newOptionsList[idx] = {
            optionText: e.target.value,
            isCorrect: optionsList[idx].isCorrect,
        }
        setOptionsList(newOptionsList);
    }

    const handleCorrectOption = (e, idx) => {
        let newOptionsList = [...optionsList];
        newOptionsList[idx] = {
            optionText: optionsList[idx].optionText,
            isCorrect: e.target.checked,
        }
        setOptionsList(newOptionsList);
    }

    if (!questionType || questionType === "free_response") {
        return;
    }

    return (
        <>
            {optionsList.map(({ optionText, isCorrect }, idx) => {
                console.log(idx);
                return (
                    <div>
                        <label>Option Text:</label>
                        <input onChange={(e) => handleOptionText(e, idx)} type="text" required />

                        <label>Is Correct:</label>
                        <input onChange={(e) => handleCorrectOption(e, idx)} type="checkbox" />

                        <button className="remove-option-button" type="button" onClick={() => handleRemoveOption(idx)}>x</button>
                    </div>
                )
            })}
            <AddOptionButton optionsList={optionsList} setOptionsList={setOptionsList} />
        </>
    )
}

export default OptionsForm;

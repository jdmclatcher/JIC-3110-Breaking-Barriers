import { useState } from "react";
import AddOptionButton from "./AddOptionButton";
import "./OptionsForm.css";

const OptionsForm = ({
  questionType,
  optionsList,
  questionList,
  setQuestionList,
  questionIdx,
  setOptionsList,
}) => {
  const handleRemoveOption = (idx) => {
    let filteredOptionsList = optionsList.filter((_, i) => i !== idx);
    setOptionsList(filteredOptionsList);
    let newQuestionList = [...questionList];
    newQuestionList[questionIdx] = {
      question_text: questionList[questionIdx].question_text,
      question_type: questionList[questionIdx].question_type,
      options: filteredOptionsList,
    };
    setQuestionList(newQuestionList);
  };

  const handleOptionText = (e, idx) => {
    let newOptionsList = [...optionsList];
    newOptionsList[idx] = {
      option_text: e.target.value,
      is_correct: optionsList[idx].is_correct,
    };
    setOptionsList(newOptionsList);
    let newQuestionList = [...questionList];
    newQuestionList[questionIdx] = {
      question_text: questionList[questionIdx].question_text,
      question_type: questionList[questionIdx].question_type,
      options: newOptionsList,
    };
    setQuestionList(newQuestionList);
  };

  const handleCorrectOption = (e, idx) => {
    let newOptionsList = [...optionsList];
    newOptionsList[idx] = {
      option_text: optionsList[idx].option_text,
      is_correct: e.target.checked,
    };
    setOptionsList(newOptionsList);
    let newQuestionList = [...questionList];
    newQuestionList[questionIdx] = {
      question_text: questionList[questionIdx].question_text,
      question_type: questionList[questionIdx].question_type,
      options: newOptionsList,
    };
    setQuestionList(newQuestionList);
  };

  if (!questionType || questionType === "free_response") {
    return;
  }

  return (
    <>
      {optionsList.map(({ option_text, is_correct }, idx) => {
        return (
          <div key={`option-${idx}`}>
            <label>Option Text:</label>
            <input
              onChange={(e) => handleOptionText(e, idx)}
              type="text"
              required
              value={option_text}
            />

            <label>Is Correct:</label>
            <input
              onChange={(e) => handleCorrectOption(e, idx)}
              type="checkbox"
              value={is_correct}
            />

            <button
              className="remove-option-button"
              type="button"
              onClick={() => handleRemoveOption(idx)}
            >
              x
            </button>
          </div>
        );
      })}
      <AddOptionButton
        optionsList={optionsList}
        setOptionsList={setOptionsList}
        questionList={questionList}
        setQuestionList={setQuestionList}
        questionIdx={questionIdx}
      />
    </>
  );
};

export default OptionsForm;

import { useState, useRef } from "react";
import OptionsForm from "../OptionsForm";
import RemoveQuestionButton from "../RemoveQuestionButton";

const QuestionForm = ({ questionList, questionData, setQuestionList, idx }) => {
  const prevQuestionText = questionData.question_text;
  const prevQuestionType = questionData.question_type;
  const prevQuestionWeight = questionData.question_weight;
  const prevOptionsList = questionData.options;
  const [optionsList, setOptionsList] = useState(prevOptionsList);

  const handleQuestionTextChange = (e) => {
    let newQuestionList = [...questionList];
    newQuestionList[idx] = {
      question_text: e.target.value,
      question_type: questionList[idx].question_type,
      question_weight: questionList[idx].question_weight,
      options: optionsList,
    };
    setQuestionList(newQuestionList);
  };

  const handleQuestionTypeChange = (e) => {
    let newQuestionList = [...questionList];
    newQuestionList[idx] = {
      question_text: questionList[idx].question_text,
      question_type: e.target.value,
      question_weight: questionList[idx].question_weight,
      options: optionsList,
    };
    setQuestionList(newQuestionList);
  };

  const handleQuestionWeightChange = (e) => {
    let newQuestionList = [...questionList];
    newQuestionList[idx] = {
      question_text: questionList[idx].question_text,
      question_type: questionList[idx].question_type,
      question_weight: e.target.value,
      options: optionsList,
    };
    setQuestionList(newQuestionList);
  };

  return (
    <div className="py-2 border-2 border-black rounded-md p-3 my-3 shadow-md flex flex-col">
      <h3 className="font-medium text-normal">{idx + 1}</h3>
      <label className="font-medium text-lg">Question Text:</label>
      <input
        className="border-2 border-black rounded-md p-1 shadow-md"
        required
        onChange={(e) => handleQuestionTextChange(e)}
        value={prevQuestionText}
      />

      <label className="font-medium text-lg">Question Type:</label>
      <select
        className="border-2 border-black rounded-md p-1 shadow-md"
        onChange={(e) => handleQuestionTypeChange(e)}
        required
        value={prevQuestionType}
      >
        <option value="">Select Below</option>
        <option value="multiple_choice">Multiple Choice</option>
        <option value="free_response">Free Response</option>
      </select>

      <label className="font-medium text-lg">Question Weight:</label>
      <input
        className="border-2 border-black rounded-md p-1 shadow-md"
        onChange={(e) => handleQuestionWeightChange(e)}
        required
        type="number"
        min="0"
        value={prevQuestionWeight}
      />

      <OptionsForm
        questionType={questionList[idx].question_type}
        optionsList={optionsList}
        questionList={questionList}
        setQuestionList={setQuestionList}
        questionIdx={idx}
        setOptionsList={setOptionsList}
      />
      <div className="flex flex-row justify-end">
        <RemoveQuestionButton
          questionList={questionList}
          setQuestionList={setQuestionList}
          idx={idx}
        />
      </div>
    </div>
  );
};

export default QuestionForm;

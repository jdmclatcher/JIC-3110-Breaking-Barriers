import AddOptionButton from "./AddOptionButton";
import { AiOutlineDelete } from "react-icons/ai";

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
      question_weight: questionList[questionIdx].question_weight,
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
      question_weight: questionList[questionIdx].question_weight,
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
      question_weight: questionList[questionIdx].question_weight,
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
          <div
            key={`option-${idx}`}
            className="flex flex-col border-2 border-gray my-2 rounded-md shadow-md p-2"
          >
            <label className="font-small text-normal">Option Text:</label>
            <input
              className="border-2 border-black rounded-md p-1 shadow-md"
              onChange={(e) => handleOptionText(e, idx)}
              type="text"
              required
              value={option_text}
            />

            <div className="flex flex-row justify-between pt-2">
              <div>
                <label className="font-small text-normal me-3">
                  Is Correct:
                </label>
                <input
                  onChange={(e) => handleCorrectOption(e, idx)}
                  type="checkbox"
                  checked={is_correct}
                />
              </div>

              <button
                className="bg-red-500 px-2 py-1 text-white hover:bg-red-400 rounded-lg"
                type="button"
                onClick={() => handleRemoveOption(idx)}
              >
                <AiOutlineDelete size={25} />
              </button>
            </div>
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

const AddOptionButton = ({
  optionsList,
  setOptionsList,
  questionList,
  setQuestionList,
  questionIdx,
}) => {
  const handleAddOption = () => {
    let newOptionsList = [
      ...optionsList,
      {
        option_text: "",
        is_correct: false,
      },
    ];
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

  return (
    <button
      className="bg-green-700 rounded-md text-lg text-white shadow-md py-1 mt-2"
      type="button"
      onClick={handleAddOption}
    >
      Add Option
    </button>
  );
};

export default AddOptionButton;

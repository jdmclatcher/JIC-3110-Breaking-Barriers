const AddQuestionButton = ({ questionList, setQuestionList }) => {
  const addQuestion = () => {
    setQuestionList([
      ...questionList,
      {
        question_text: "",
        question_type: "",
        question_weight: 0,
        options: [],
      },
    ]);
  };

  return (
    <button
      className="bg-secondary shadow-md px-3 py-2 hover:bg-primary rounded-md my-3 text-white"
      type="button"
      onClick={addQuestion}
    >
      Add Question
    </button>
  );
};

export default AddQuestionButton;

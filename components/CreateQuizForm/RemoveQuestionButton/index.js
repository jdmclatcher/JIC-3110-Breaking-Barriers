import { AiOutlineDelete } from "react-icons/ai";

const RemoveQuestionButton = ({ questionList, setQuestionList, idx }) => {
  const removeQuestion = () => {
    let filteredQuestionList = questionList.filter((_, i) => i !== idx);
    setQuestionList(filteredQuestionList);
  };

  return (
    <button
      className="bg-red-700 px-5 py-1 text-white hover:bg-red-600 rounded-md shadow-md my-2"
      type="button"
      onClick={removeQuestion}
    >
      <AiOutlineDelete size={25} />
    </button>
  );
};

export default RemoveQuestionButton;

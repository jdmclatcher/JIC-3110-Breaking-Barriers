import "./AddOptionButton.css"

const AddOptionButton = ({ optionsList, setOptionsList, questionList, setQuestionList, questionIdx }) => {
    const handleAddOption = () => {
        let newOptionsList = [
            ...optionsList,
            {
                optionText: "",
                isCorrect: false,
            },
        ];
        setOptionsList(newOptionsList);
        let newQuestionList = [...questionList];
        newQuestionList[questionIdx] = {
            questionText:  questionList[questionIdx].questionText,
            questionType: questionList[questionIdx].questionType,
            options: newOptionsList,
        }
        setQuestionList(newQuestionList);
    }
    
    return (
        <button className="add-option-button" type="button" onClick={handleAddOption}>+</button>
    )
}

export default AddOptionButton;

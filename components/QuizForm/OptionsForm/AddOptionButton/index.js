import "./AddOptionButton.css"

const AddOptionButton = ({ optionsList, setOptionsList, questionList, setQuestionList, questionIdx }) => {
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
            question_text:  questionList[questionIdx].question_text,
            question_type: questionList[questionIdx].question_type,
            options: newOptionsList,
        }
        setQuestionList(newQuestionList);
    }
    
    return (
        <button className="add-option-button" type="button" onClick={handleAddOption}>+</button>
    )
}

export default AddOptionButton;

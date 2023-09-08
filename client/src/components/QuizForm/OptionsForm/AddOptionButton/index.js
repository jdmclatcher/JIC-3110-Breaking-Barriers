import "./AddOptionButton.css"

const AddOptionButton = ({ optionsList, setOptionsList }) => {
    const handleAddOption = () => {
        setOptionsList([
            ...optionsList,
            {
                optionText: "",
                isCorrect: false,
            },
        ]);
    }
    console.log("===", optionsList);
    
    return (
        <button className="add-option-button" type="button" onClick={handleAddOption}>+</button>
    )
}

export default AddOptionButton;

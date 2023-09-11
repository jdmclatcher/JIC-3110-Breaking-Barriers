import { useState, useRef } from "react";
import QuestionForm from "./QuestionForm";
import AddQuestionButton from "./AddQuestionButton";
import "./QuizForm.css"

const QuizForm = ({ prevQuizName, prevQuestionList }) => {
    const [questionList, setQuestionList] = useState(prevQuestionList);
    const questionNameRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            questionName: questionNameRef.current.value,
            questionList: questionList,
        });
    }

    return (
        <form className="quiz-form" onSubmit={e => handleSubmit(e)}>
            <div className="quiz-name-input">
                <label>Quiz Name:</label>
                <input type="text" ref={questionNameRef} required/>
            </div>
            
            {questionList.map((_, idx) => {
                return (
                    <QuestionForm
                        id={idx}
                        questionList={questionList}
                        setQuestionList={setQuestionList}
                        idx={idx}
                    />
                )
            })}
            <AddQuestionButton
                questionList={questionList}
                setQuestionList={setQuestionList}
            />
            <input className="save-quiz-button" type="submit" />
        </form>
    )

}


QuizForm.defaultProps = {
    prevQuizName: "",
    prevQuestionList: [],
}

export default QuizForm;

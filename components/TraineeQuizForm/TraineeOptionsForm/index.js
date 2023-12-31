const TraineeOptionsForm = ({
  questionId,
  questionType,
  options,
  questionResponses,
  setQuestionResponses,
}) => {
  const handleSelectOption = (e) => {
    let newQuestionResponses = { ...questionResponses };
    newQuestionResponses[questionId] = {
      question_id: questionId,
      response_text: "",
      selected_option_id: e.target.value,
    };
    setQuestionResponses({ ...newQuestionResponses });
  };

  const handleFreeResponseUpdate = (e) => {
    let newQuestionResponses = { ...questionResponses };
    newQuestionResponses[questionId] = {
      question_id: questionId,
      response_text: e.target.value,
      selected_option_id: 0,
    };
    setQuestionResponses({ ...newQuestionResponses });
  };

  return (
    <>
      {questionType === "free_response" ? (
        <textarea
          className="border-2 rounded-md p-2 w-full h-40"
          onChange={handleFreeResponseUpdate}
        />
      ) : (
        options.map((o, i) => {
          return (
            <>
              <input
                name={`${questionId}`}
                type="radio"
                id={o.option_id}
                value={o.option_id}
                onChange={handleSelectOption}
              />
              <label className="pl-3" for={o.option_id}>
                {o.option_text}
              </label>
              <br />
            </>
          );
        })
      )}
    </>
  );
};

export default TraineeOptionsForm;

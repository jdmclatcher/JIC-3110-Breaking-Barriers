-- Create a procedure to assign a trainee to an instructor
CREATE OR REPLACE PROCEDURE assign_trainee_to_instructor(
    p_trainee_per_id VARCHAR(100),
    p_instructor_per_id VARCHAR(100)
) LANGUAGE plpgsql AS $$
BEGIN
    -- Check if the provided trainee and instructor exist
    IF NOT EXISTS (SELECT 1 FROM person WHERE per_id = p_trainee_per_id) THEN
        RAISE EXCEPTION 'Trainee with per_id % does not exist', p_trainee_per_id;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM person WHERE per_id = p_instructor_per_id) THEN
        RAISE EXCEPTION 'Instructor with per_id % does not exist', p_instructor_per_id;
    END IF;

    -- Assign the trainee to the instructor
    UPDATE trainee t
    SET instructor_id = (SELECT i.per_id FROM instructor i WHERE per_id = p_instructor_per_id)
    WHERE t.per_id = p_trainee_per_id;
    COMMIT;
END;
$$;

-- Create a procedure to assign a score to a trainee for a specific quiz
CREATE OR REPLACE PROCEDURE assign_score_to_quiz(
    p_trainee_per_id VARCHAR(100),
    p_quiz_response_id INT,
    p_quiz_score INT
) LANGUAGE plpgsql AS $$
BEGIN
    -- Check if the provided trainee and response id exist
    IF NOT EXISTS (SELECT 1 FROM person WHERE per_id = p_trainee_per_id) THEN
        RAISE EXCEPTION 'Trainee with per_id % does not exist', p_trainee_per_id;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM quiz_responses WHERE response_id = p_quiz_response_id) THEN
        RAISE EXCEPTION 'Quiz with response id % does not exist', p_quiz_response_id;
    END IF;

    -- Assign the quiz_responses table with the quiz score
    UPDATE quiz_responses q
    SET quiz_score = p_quiz_score
    WHERE q.trainee_id = p_trainee_per_id
    AND q.response_id = p_quiz_response_id;
    COMMIT;
END;
$$;


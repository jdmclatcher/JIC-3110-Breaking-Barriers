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

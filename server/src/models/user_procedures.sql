-- Create a procedure to create a person
CREATE OR REPLACE PROCEDURE create_person(
    p_per_id VARCHAR(100),
    p_email VARCHAR(100),
    p_first_name VARCHAR(50),
    p_last_name VARCHAR(50),
    p_password VARCHAR(50)
) LANGUAGE plpgsql AS $$
BEGIN
    -- Check if the person exists already
    IF EXISTS (SELECT 1 FROM person WHERE per_id = p_per_id) THEN
        RAISE EXCEPTION 'Person already exists : %', p_per_id;
    END IF;

    -- Insert new person into person table
    INSERT INTO person (per_id, email, first_name, last_name, password)
    VALUES (
        p_per_id,
        p_email,
        p_first_name,
        p_last_name,
        p_password
    );
END;
$$;

-- Create procedure to add a new admin to administrator table
CREATE OR REPLACE PROCEDURE create_admin(
    p_per_id VARCHAR(100)
) LANGUAGE plpgsql AS $$
BEGIN
    -- Check if the admin exists already
    IF EXISTS (SELECT 1 FROM administrator WHERE per_id = p_per_id) THEN
        RAISE EXCEPTION 'Admin already exists : %', p_per_id;
    END IF;

    -- Insert new admin into admin table
    INSERT INTO administrator (per_id)
    VALUES (
        p_per_id
    );
END;
$$;

-- Create procedure to add a new instructor to instructor table
CREATE OR REPLACE PROCEDURE create_instructor(
    p_per_id VARCHAR(100)
) LANGUAGE plpgsql AS $$
BEGIN
    -- Check if the instructor exists already
    IF EXISTS (SELECT 1 FROM instructor WHERE per_id = p_per_id) THEN
        RAISE EXCEPTION 'Instructor already exists : %', p_per_id;
    END IF;

    -- Insert new admin into admin table
    INSERT INTO instructor (per_id)
    VALUES (
        p_per_id
    );
END;
$$;

-- Create procedure to add a new trainee to trainee table
CREATE OR REPLACE PROCEDURE create_trainee(
    p_per_id VARCHAR(100),
) LANGUAGE plpgsql AS $$
BEGIN
    -- Check if the trainee exists already
    IF EXISTS (SELECT 1 FROM trainee WHERE per_id = p_per_id) THEN
        RAISE EXCEPTION 'Trainee already exists : %', p_per_id;
    END IF;

    -- Insert new admin into admin table
    INSERT INTO trainee (per_id)
    VALUES (
        p_per_id,
    );
END;
$$;

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

    -- Check if trainee is already assigned to instructor
    IF EXISTS (SELECT 1 FROM trainee WHERE per_id = p_per_id AND instructor_id = p_instructor_per_id) THEN
        RAISE EXCEPTION 'Trainee already assigned to instructor';
    END IF;

    -- Assign the trainee to the instructor
    INSERT INTO assigned_to (trainee_id, instructor_id)
    VALUES (
        p_trainee_per_id,
        p_instructor_per_id,
    )
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


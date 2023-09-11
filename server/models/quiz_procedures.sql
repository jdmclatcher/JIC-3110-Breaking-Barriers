-- Create a stored procedure to add a quiz

-- Quizzes are automatically owned/assigned to the instructors that create them
-- Trainees automatically gain access to all quizzes created by the instructor assigned to them

-- PARAMETERS:
--  int - instructor id - id of instructor creating quiz (owner of quiz) (p_instructor_id)
--  String - title (p_title)
--  String - description (p_description)
--  JSON array or object - questions (p_questions)
-- Create a stored procedure to create a quiz
-- Create a stored procedure to create a quiz
DROP PROCEDURE IF EXISTS create_quiz(p_instructor_per_id INT, p_title VARCHAR(255), p_description TEXT, p_questions JSONB);
CREATE OR REPLACE PROCEDURE create_quiz(
    p_instructor_per_id VARCHAR(100),
    p_title VARCHAR(255),
    p_description TEXT,
    p_questions JSONB
) LANGUAGE plpgsql AS $$
DECLARE
    d_quiz_id INT;
    d_question_record JSONB;
    d_option_record JSONB;
    d_question_text TEXT;
    d_question_type TEXT;
    d_option_text TEXT;
    d_is_correct BOOLEAN;
BEGIN

    -- Check if the provided instructor per_id exists
    IF NOT EXISTS (SELECT 1 FROM instructor WHERE per_id = p_instructor_per_id) THEN
        RAISE EXCEPTION 'Instructor with per_id % does not exist', p_instructor_per_id;
    END IF;

    -- Insert the quiz information into the 'quizzes' table and assign it to the instructor
    INSERT INTO quizzes (instructor_id, title, description)
    VALUES (
            (SELECT instructor_id FROM instructor WHERE per_id = p_instructor_per_id),
            p_title,
            p_description
    ) RETURNING quiz_id INTO d_quiz_id;

    -- Loop over JSON elements for questions
    FOR d_question_record IN SELECT * FROM jsonb_array_elements(p_questions)
    LOOP
        -- Extract values from the JSON object
        d_question_text := d_question_record->>'question_text';
        d_question_type := d_question_record->>'question_type';

        -- Insert the question into the 'questions' table
        INSERT INTO questions (quiz_id, question_text, question_type)
        VALUES (d_quiz_id, d_question_text, d_question_type);

        IF d_question_type = 'multiple_choice' THEN
            -- Loop over the options for multiple choice questions
            FOR d_option_record IN SELECT * FROM jsonb_array_elements(d_question_record->'options')
            LOOP
                -- Extract values from the JSON object
                d_option_text := d_option_record->>'option_text';
                d_is_correct := (d_option_record->>'is_correct')::BOOLEAN;

                -- Insert the option into the 'options' table
                INSERT INTO options (question_id, option_text, is_correct)
                VALUES ((SELECT question_id FROM questions WHERE quiz_id = d_quiz_id AND question_text = d_question_text), d_option_text, d_is_correct);
            END LOOP;
        END IF;
    END LOOP;
END;
$$;

-- Create a stored procedure to edit a quiz
-- PARAMETERS:
--  INT - quiz id (id of the quiz to edit) (p_quiz_id)
--  String - title (p_title)
--  String - description (p_description)
--  JSON array or object - questions (p_questions)
-- Create a stored procedure to edit a quiz
DROP PROCEDURE IF EXISTS edit_quiz(p_quiz_id INT, p_title VARCHAR(255), p_description TEXT, p_questions JSONB);
CREATE OR REPLACE PROCEDURE edit_quiz(
    p_quiz_id INT,
    p_title VARCHAR(255),
    p_description TEXT,
    p_questions JSONB
) LANGUAGE plpgsql AS $$
DECLARE
    d_question_record JSONB;
    d_option_record JSONB;
    d_question_text TEXT;
    d_question_type TEXT;
    d_option_text TEXT;
    d_is_correct BOOLEAN;
BEGIN
    -- Update the quiz information in the 'quizzes' table
    UPDATE quizzes
    SET title = p_title, description = p_description, updated_at = NOW()
    WHERE quiz_id = p_quiz_id;

    -- Delete existing questions and options for the quiz
    DELETE FROM questions WHERE quiz_id = p_quiz_id;
    DELETE FROM options WHERE question_id IN (SELECT question_id FROM questions WHERE quiz_id = p_quiz_id);

    -- Loop over JSON elements for questions
    FOR d_question_record IN SELECT * FROM jsonb_array_elements(p_questions)
    LOOP
        -- Extract values from the JSON object
        d_question_text := d_question_record->>'question_text';
        d_question_type := d_question_record->>'question_type';

        -- Insert the question into the 'questions' table
        INSERT INTO questions (quiz_id, question_text, question_type)
        VALUES (p_quiz_id, d_question_text, d_question_type);

        IF d_question_type = 'multiple_choice' THEN
            -- Loop over the options for multiple choice questions
            FOR d_option_record IN SELECT * FROM jsonb_array_elements(d_question_record->'options')
            LOOP
                -- Extract values from the JSON object
                d_option_text := d_option_record->>'option_text';
                d_is_correct := (d_option_record->>'is_correct')::BOOLEAN;

                -- Insert the option into the 'options' table
                INSERT INTO options (question_id, option_text, is_correct)
                VALUES ((SELECT question_id FROM questions WHERE quiz_id = p_quiz_id AND question_text = d_question_text), d_option_text, d_is_correct);
            END LOOP;
        END IF;
    END LOOP;
END;
$$;

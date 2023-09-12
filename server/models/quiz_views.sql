-- Create a view to display questions of a quiz by quiz_id
DROP VIEW IF EXISTS view_questions_for_quiz;
CREATE OR REPLACE VIEW view_questions_for_quiz AS
SELECT
    q.question_id,
    q.quiz_id,
    q.question_text
FROM
    questions q;


-- View all quizzes (for admin use)
DROP VIEW IF EXISTS view_all_quizzes;
CREATE OR REPLACE VIEW view_all_quizzes AS
SELECT
    q.quiz_id,
    q.title,
    q.description,
    p.first_name AS instructor_first_name,
    p.last_name AS instructor_last_name
FROM
    quizzes q
INNER JOIN
    instructor i ON q.instructor_id = i.instructor_id
INNER JOIN
    person p ON i.per_id = p.per_id;

-- View quizzes available to a instructor
-- EXAMPLE USE (for instructor with per_id "test"):
--      "SELECT * FROM view_quizzes_for_instructor WHERE instructor_per_id = 'test';"
DROP VIEW IF EXISTS view_quizzes_for_instructor;
CREATE OR REPLACE VIEW view_quizzes_for_instructor AS
SELECT
    q.quiz_id,
    q.title,
    q.description,
    p.first_name AS instructor_first_name,
    p.last_name AS instructor_last_name,
    i.per_id AS instructor_per_id
FROM
    quizzes q
INNER JOIN
    instructor i ON q.instructor_id = i.instructor_id
INNER JOIN
    person p ON i.per_id = p.per_id;

-- View quizzes available for a trainee
-- With this view, trainees automatically have access to any quizzes created by
--  their instructor.
-- EXAMPLE USE (for trainee with per_id "test"):
--      "SELECT * FROM view_quizzes_for_trainee WHERE trainee_per_id = 'test';"
DROP VIEW IF EXISTS view_quizzes_for_trainee;
CREATE OR REPLACE VIEW view_quizzes_for_trainee AS
SELECT
    q.quiz_id,
    q.title,
    q.description,
    p.first_name AS instructor_first_name,
    p.last_name AS instructor_last_name,
    t.per_id AS trainee_per_id
FROM
    quizzes q
INNER JOIN
    instructor i ON q.instructor_id = i.instructor_id
INNER JOIN
    trainee t ON i.instructor_id = t.instructor_id
INNER JOIN
    person p ON i.per_id = p.per_id;

-- View responses for a specific quiz made by a specific trainee
DROP VIEW IF EXISTS view_trainee_quiz_responses;
CREATE OR REPLACE VIEW view_trainee_quiz_responses AS
SELECT
    qr.response_id AS quiz_response_id,
    qr.quiz_id,
    qr.user_id AS trainee_id,
    p.first_name AS trainee_first_name,
    p.last_name AS trainee_last_name,
    qr.created_at AS quiz_response_created_at,
    p2.first_name AS instructor_first_name,
    p2.last_name AS instructor_last_name,
    q.question_id,
    q.question_text,
    q.question_type,
    qr2.response_text,
    qr2.selected_option_id
FROM quiz_responses qr
JOIN trainee t ON qr.user_id = t.trainee_id
JOIN person p ON t.per_id = p.per_id
JOIN quizzes qz ON qr.quiz_id = qz.quiz_id
JOIN instructor i ON qz.instructor_id = i.instructor_id
JOIN person p2 ON i.per_id = p2.per_id
JOIN question_responses qr2 ON qr.response_id = qr2.response_id
JOIN questions q ON qr2.question_id = q.question_id;





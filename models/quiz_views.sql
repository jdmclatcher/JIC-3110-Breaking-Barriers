-- Create a view to display questions of a quiz by quiz_id
DROP VIEW IF EXISTS view_questions_for_quiz;
CREATE OR REPLACE VIEW view_questions_for_quiz AS
SELECT
    q.question_id,
    q.quiz_id,
    q.question_text
FROM
    questions q;
	
-- Create a view to display questions with options of a quiz by quiz_id
DROP VIEW IF EXISTS view_questions_and_options_for_quiz;
CREATE OR REPLACE VIEW view_questions_and_options_for_quiz AS
SELECT
    q.question_id,
    q.quiz_id,
    q.question_text,
    q.question_type,
    q.question_weight,
	o.option_id,
	o.option_text,
    o.is_correct
FROM
    questions q
LEFT JOIN
	options o ON q.question_id = o.question_id
ORDER BY question_id;


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
    instructor i ON q.instructor_id = i.per_id
INNER JOIN
    person p ON i.per_id = p.per_id;

-- View all quiz responses (for instructor use)
DROP VIEW IF EXISTS view_all_quiz_responses;
CREATE OR REPLACE VIEW view_all_quiz_responses AS
SELECT
    q.quiz_id,
    qu.question_id,
    qu.question_text,
    qu.question_type,
    qr.response_text,
    qr.selected_option_id,
    o.option_text,
    o.is_correct,
    qur.trainee_id
FROM
    quizzes q
LEFT JOIN
    questions qu on q.quiz_id = qu.quiz_id
LEFT JOIN
    question_responses qr ON qu.question_id = qr.question_id
INNER JOIN
    options o on qr.selected_option_id = o.option_id
LEFT JOIN
    quiz_responses qur ON qr.response_id = qur.response_id;

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
    instructor i ON q.instructor_id = i.per_id
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
    a.trainee_id AS trainee_per_id
FROM
    assigned_to a
INNER JOIN
    instructor i ON a.instructor_id = i.per_id
INNER JOIN
    quizzes q ON i.per_id = q.instructor_id;

-- View responses for a specific quiz made by a specific trainee
DROP VIEW IF EXISTS view_trainee_quiz_responses;
CREATE OR REPLACE VIEW view_trainee_quiz_responses AS
SELECT
    qr.response_id AS quiz_response_id,
    qr.quiz_id,
    qr.trainee_id AS trainee_id,
    p.first_name AS trainee_first_name,
    p.last_name AS trainee_last_name,
    qr.created_at AS quiz_response_created_at,
    p2.first_name AS instructor_first_name,
    p2.last_name AS instructor_last_name,
    q.question_id,
    q.question_text,
    q.question_type,
    q.question_weight,
    qr2.response_text,
    qr2.selected_option_id
FROM quiz_responses qr
JOIN trainee t ON qr.trainee_id = t.per_id
JOIN person p ON t.per_id = p.per_id
JOIN quizzes qz ON qr.quiz_id = qz.quiz_id
JOIN instructor i ON qz.instructor_id = i.per_id
JOIN person p2 ON i.per_id = p2.per_id
JOIN question_responses qr2 ON qr.response_id = qr2.response_id
JOIN questions q ON qr2.question_id = q.question_id;

-- View score for a specific quiz taken by a trainee
DROP VIEW IF EXISTS trainee_single_quiz_score_view;
CREATE OR REPLACE VIEW trainee_single_quiz_score_view AS
SELECT
    qr.response_id AS quiz_response_id,
    qr.created_at AS submission_time,
    qr.quiz_score AS score,
    qr.quiz_id AS quiz_id,
    q.title AS quiz_title,
    p.per_id AS trainee_per_id,
    p.first_name AS trainee_first_name,
    p.last_name AS trainee_last_name
FROM
    quiz_responses qr
    JOIN trainee t ON qr.trainee_id = t.per_id
    JOIN person p ON t.per_id = p.per_id
    JOIN quizzes q ON qr.quiz_id = q.quiz_id;

-- View a list of all quizzes and scores for a trainee
DROP VIEW IF EXISTS trainee_all_quizzes_score_view;
CREATE OR REPLACE VIEW trainee_all_quizzes_score_view AS
SELECT
    tr.first_name AS trainee_first_name,
    tr.last_name AS trainee_last_name,
    ir.first_name AS instructor_first_name,
    ir.last_name AS instructor_last_name,
    q.quiz_id,
    q.title AS quiz_title,
    qr.quiz_score
FROM
    assigned_to a
    JOIN quiz_responses qr ON a.trainee_id = qr.trainee_id
    JOIN quizzes q ON qr.quiz_id = q.quiz_id
    JOIN person tr ON a.trainee_id = tr.per_id
    JOIN person ir ON a.instructor_id = ir.per_id;


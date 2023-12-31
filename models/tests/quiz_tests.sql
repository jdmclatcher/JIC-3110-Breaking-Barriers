-- Create an administrator
INSERT INTO person (per_id, first_name, last_name, password)
VALUES ('admin1', 'Admin', 'Smith', 'admin_password');

INSERT INTO administrator (per_id)
VALUES ('admin1');

-- Create an instructor
INSERT INTO person (per_id, first_name, last_name, password)
VALUES ('instructor1', 'John', 'Doe', 'instructor_password');

INSERT INTO instructor (per_id)
VALUES ('instructor1');

-- Create a trainee assigned to the instructor
INSERT INTO person (per_id, first_name, last_name, password)
VALUES ('trainee1', 'Alice', 'Johnson', 'trainee_password');

INSERT INTO trainee (per_id)
VALUES ('trainee1');

-- Assign the trainee to the instructor using the procedure
CALL assign_trainee_to_instructor('trainee1', 'instructor1');

-- Create a quiz as the instructor
CALL create_quiz('instructor1', 'Test Quiz', 'Quiz created for testing purposes.', '[
    {
        "question_text": "What is 2 + 2?",
        "question_type": "multiple_choice",
        "options": [
            {"option_text": "3", "is_correct": false},
            {"option_text": "4", "is_correct": true},
            {"option_text": "5", "is_correct": false}
        ]
    },
    {
        "question_text": "What is the capital of France?",
        "question_type": "multiple_choice",
        "options": [
            {"option_text": "London", "is_correct": false},
            {"option_text": "Berlin", "is_correct": false},
            {"option_text": "Paris", "is_correct": true}
        ]
    }
]');

-- Output the view of quizzes for the instructor
SELECT *
FROM view_quizzes_for_instructor
WHERE instructor_per_id = 'instructor1';

-- Output the view of quizzes for the trainee
SELECT *
FROM view_quizzes_for_trainee
WHERE trainee_per_id = 'trainee1';

-- Display Quiz Details
SELECT * FROM view_questions_for_quiz WHERE quiz_id = 1;

CALL edit_quiz(1, 'Edited Quiz', 'Edited Quiz Description', '[
    {
        "question_text": "What is 2 + 3?",
        "question_type": "multiple_choice",
        "options": [
            {"option_text": "3", "is_correct": false},
            {"option_text": "4", "is_correct": false},
            {"option_text": "5", "is_correct": true}
        ]
    },
    {
        "question_text": "What is the capital of England?",
        "question_type": "multiple_choice",
        "options": [
            {"option_text": "London", "is_correct": true},
            {"option_text": "Berlin", "is_correct": false},
            {"option_text": "Paris", "is_correct": false}
        ]
    }
]');

SELECT * FROM view_questions_for_quiz WHERE quiz_id = 1;

CALL submit_quiz('trainee1', 1, '[
    {
        "question_id": "3",
        "selected_option_id": "0"
    },
    {
        "question_id": "4",
        "selected_option_id": "2"
    }
]');

SELECT * FROM view_trainee_quiz_responses WHERE quiz_id = 1 AND trainee_id = 'trainee1';

CALL assign_score_to_quiz('trainee1', 1, 95);

SELECT * FROM trainee_single_quiz_score_view;

SELECT * FROM trainee_all_quizzes_score_view;

CALL upload_file('instructor1', 'test_file', 'firebase://test_file.pdf');

SELECT * FROM view_instructor_files;

SELECT * FROM view_trainee_files;

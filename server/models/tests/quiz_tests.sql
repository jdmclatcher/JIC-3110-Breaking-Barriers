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


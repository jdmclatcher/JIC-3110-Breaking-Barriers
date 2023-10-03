-- PERSON
DROP TABLE IF EXISTS person CASCADE;
CREATE TABLE person (
    per_id VARCHAR(100) PRIMARY KEY,
    email VARCHAR(100),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    password VARCHAR(100) NOT NULL
);

-- ADMINISTRATORS
DROP TABLE IF EXISTS administrator CASCADE;
CREATE TABLE administrator (
    per_id VARCHAR(100) NOT NULL,
    PRIMARY KEY (per_id),
    CONSTRAINT admin_per FOREIGN KEY (per_id) REFERENCES person(per_id)
);

-- INSTRUCTORS
DROP TABLE IF EXISTS instructor CASCADE;
CREATE TABLE instructor (
    per_id VARCHAR(100) NOT NULL,
    PRIMARY KEY (per_id),
    CONSTRAINT instr_per FOREIGN KEY (per_id) REFERENCES person(per_id)
);

-- TRAINEES
DROP TABLE IF EXISTS trainee CASCADE;
CREATE TABLE trainee (
    per_id VARCHAR(100) NOT NULL,
    PRIMARY KEY (per_id),
    instructor_id VARCHAR(100), -- store reference to the instructor trainee is assigned to
    CONSTRAINT trainee_per FOREIGN KEY (per_id) REFERENCES person(per_id),
    CONSTRAINT instr_trainee FOREIGN KEY (instructor_id) REFERENCES instructor(per_id) -- store reference to the instructor trainee is assigned to
);

-- QUIZZES
DROP TABLE IF EXISTS quizzes CASCADE;
CREATE TABLE quizzes (
    quiz_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    instructor_id VARCHAR(100) NOT NULL REFERENCES instructor(per_id) -- assigns quiz to instructor
);

-- QUESTIONS (within quizzes)
DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions (
    question_id SERIAL PRIMARY KEY,
    quiz_id INT REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(20) NOT NULL CHECK (question_type IN ('multiple_choice', 'free_response', 'select_all')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- OPTIONS (within questions)
DROP TABLE IF EXISTS options CASCADE;
CREATE TABLE options (
    option_id SERIAL PRIMARY KEY,
    question_id INT REFERENCES questions(question_id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- QUIZ RESPONSES (within quizzes)
DROP TABLE IF EXISTS quiz_responses CASCADE;
CREATE TABLE quiz_responses (
    response_id SERIAL PRIMARY KEY,
    quiz_id INT REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
    trainee_id VARCHAR(100) NOT NULL REFERENCES trainee(per_id), -- per_id of trainee responsing to quiz
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    quiz_score INT CHECK (quiz_score >= 0 AND quiz_score <= 100)
);

-- QUESTION RESPONSES (for individual question responses in quizzes)
DROP TABLE IF EXISTS question_responses CASCADE;
CREATE TABLE question_responses (
    question_response_id SERIAL PRIMARY KEY,
    response_id INT REFERENCES quiz_responses(response_id) ON DELETE CASCADE,
    question_id INT REFERENCES questions(question_id) ON DELETE CASCADE,
    response_text TEXT, -- For text box responses
    selected_option_id INT, -- For multiple choice responses
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

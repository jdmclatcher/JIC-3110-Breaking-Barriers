-- PERSON
DROP TABLE IF EXISTS person CASCADE;
CREATE TABLE person (
    per_id VARCHAR(100) PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    password VARCHAR(100) NOT NULL
);

-- ADMINISTRATORS
DROP TABLE IF EXISTS administrator CASCADE;
CREATE TABLE administrator (
    admin_id SERIAL UNIQUE,
    per_id VARCHAR(100) NOT NULL,
    PRIMARY KEY (per_id),
    CONSTRAINT admin_per FOREIGN KEY (per_id) REFERENCES person(per_id)
);

-- INSTRUCTORS
DROP TABLE IF EXISTS instructor CASCADE;
CREATE TABLE instructor (
    instructor_id SERIAL UNIQUE,
    per_id VARCHAR(100) NOT NULL,
    PRIMARY KEY (per_id),
    CONSTRAINT instr_per FOREIGN KEY (per_id) REFERENCES person(per_id)
);

-- TRAINEES
DROP TABLE IF EXISTS trainee CASCADE;
CREATE TABLE trainee (
    trainee_id SERIAL UNIQUE,
    per_id VARCHAR(100) NOT NULL,
    PRIMARY KEY (per_id),
    instructor_id INT, -- store reference to the instructor trainee is assigned to
    CONSTRAINT train_per FOREIGN KEY (per_id) REFERENCES person(per_id),
    CONSTRAINT instr_train FOREIGN KEY (instructor_id) REFERENCES instructor(instructor_id)
);

-- QUIZZES
DROP TABLE IF EXISTS quizzes CASCADE;
CREATE TABLE quizzes (
    quiz_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    instructor_id INT REFERENCES instructor(instructor_id), -- assign quizzes to instructor
    CONSTRAINT fk_quizzes_instructor FOREIGN KEY (instructor_id) REFERENCES instructor(instructor_id)
);

-- QUESTIONS (within quizzes)
DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions (
    question_id SERIAL PRIMARY KEY,
    quiz_id INT REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(20) NOT NULL CHECK (question_type IN ('multiple_choice', 'text_box')),
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
    user_id INT REFERENCES trainee(trainee_id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
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

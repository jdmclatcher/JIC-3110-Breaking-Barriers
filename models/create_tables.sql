-- PERSON
DROP TABLE IF EXISTS person CASCADE;
CREATE TABLE person (
    per_id VARCHAR(100) PRIMARY KEY,
    email VARCHAR(100),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    password VARCHAR(100) NOT NULL,
    role VARCHAR(10) NOT NULL CHECK ((role IN ('admin', 'instructor', 'trainee')))
);

-- ADMINISTRATORS
DROP TABLE IF EXISTS administrator CASCADE;
CREATE TABLE administrator (
    per_id VARCHAR(100) NOT NULL,
    PRIMARY KEY (per_id),
    CONSTRAINT admin_per FOREIGN KEY (per_id) REFERENCES person(per_id) ON DELETE CASCADE
);

-- INSTRUCTORS
DROP TABLE IF EXISTS instructor CASCADE;
CREATE TABLE instructor (
    per_id VARCHAR(100) NOT NULL,
    PRIMARY KEY (per_id),
    CONSTRAINT instr_per FOREIGN KEY (per_id) REFERENCES person(per_id) ON DELETE CASCADE
);

-- TRAINEES
DROP TABLE IF EXISTS trainee CASCADE;
CREATE TABLE trainee (
    per_id VARCHAR(100) NOT NULL,
    PRIMARY KEY (per_id),
    CONSTRAINT trainee_per FOREIGN KEY (per_id) REFERENCES person(per_id) ON DELETE CASCADE
);

-- ASSIGN TRAINEES TO INSTRUCTORS
DROP TABLE IF EXISTS assigned_to CASCADE;
CREATE TABLE assigned_to (
    trainee_id VARCHAR(100) NOT NULL,
    instructor_id VARCHAR(100) NOT NULL, -- store reference to the instructor trainee is assigned to
    PRIMARY KEY (trainee_id, instructor_id),
    CONSTRAINT trainee_per FOREIGN KEY (trainee_id) REFERENCES trainee(per_id) ON DELETE CASCADE,
    CONSTRAINT instr_trainee FOREIGN KEY (instructor_id) REFERENCES instructor(per_id) ON DELETE CASCADE -- store reference to the instructor trainee is assigned to
);

-- QUIZZES
DROP TABLE IF EXISTS quizzes CASCADE;
CREATE TABLE quizzes (
    quiz_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    instructor_id VARCHAR(100) NOT NULL REFERENCES instructor(per_id), -- assigns quiz to instructor
    module_id INT NOT NULL REFERENCES modules(module_id) ON DELETE CASCADE,
    course_id INT REFERENCES courses(course_id) ON DELETE SET NULL
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

-- FILES
DROP TABLE IF EXISTS files CASCADE;
CREATE TABLE files (
    file_id SERIAL PRIMARY KEY,
    instructor_id VARCHAR(100) REFERENCES instructor(per_id),
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL, -- Firebase URL where the file is stored
    uploaded_at TIMESTAMP DEFAULT NOW(),
    module_id INT NOT NULL REFERENCES modules(module_id) ON DELETE CASCADE,
    course_id INT REFERENCES courses(course_id) ON DELETE SET NULL
);

-- MODULES
DROP TABLE IF EXISTS modules CASCADE;
CREATE TABLE modules (
    module_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    details TEXT,
    administrator_id VARCHAR(100) NOT NULL, -- reference to the administrator who created the module
    instructor_id VARCHAR(100) NOT NULL, -- reference to the instructor who is assigned to the module
    CONSTRAINT module_admin FOREIGN KEY (administrator_id) REFERENCES administrator(per_id),
    CONSTRAINT assigned_instructor FOREIGN KEY (instructor_id) REFERENCES instructor(per_id)
);

-- COURSES
DROP TABLE IF EXISTS courses CASCADE;
CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    instructor_id VARCHAR(100) NOT NULL, -- reference to the instructor who created the course
    module_id INT NOT NULL, -- reference to the module this course belongs to
    CONSTRAINT course_instr FOREIGN KEY (instructor_id) REFERENCES instructor(per_id),
    CONSTRAINT course_module FOREIGN KEY (module_id) REFERENCES modules(module_id)
);

-- PAGES
DROP TABLE IF EXISTS pages CASCADE;
CREATE TABLE pages (
    page_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT,
    course_id INT NOT NULL, -- reference to the course this page belongs to
    CONSTRAINT page_course FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

-- MESSAGES
DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    text_content TEXT NOT NULL,
    instructor_id VARCHAR(100) NOT NULL,
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT message_instructor FOREIGN KEY (instructor_id) REFERENCES instructor(per_id)
);

DROP TABLE IF EXISTS trainee_assigned_to_module CASCADE;
CREATE TABLE trainee_assigned_to_module (
    module_id INT NOT NULL,
    trainee_id VARCHAR(100) NOT NULL, -- store reference to the instructor trainee is assigned to
    PRIMARY KEY (module_id, trainee_id),
    CONSTRAINT module_trainee FOREIGN KEY (module_id) REFERENCES modules(module_id) ON DELETE CASCADE,
    CONSTRAINT trainee_per FOREIGN KEY (trainee_id) REFERENCES trainee(per_id) ON DELETE CASCADE
)

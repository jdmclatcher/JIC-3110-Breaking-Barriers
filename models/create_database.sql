-- PERSON
DROP TABLE IF EXISTS person CASCADE;
CREATE TABLE person (
    perId VARCHAR(100) PRIMARY KEY,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    password VARCHAR(100) NOT NULL
);

-- ADMINISTRATORS
DROP TABLE IF EXISTS administrator CASCADE;
CREATE TABLE administrator (
    adminId SERIAL PRIMARY KEY,
    perId VARCHAR(100) UNIQUE,
    FOREIGN KEY (perId) REFERENCES person(perId)
);

-- INSTRUCTORS
DROP TABLE IF EXISTS instructor CASCADE;
CREATE TABLE instructor (
    instructorId SERIAL PRIMARY KEY,
    perId VARCHAR(100) UNIQUE,
    FOREIGN KEY (perId) REFERENCES person(perId)
);

-- TRAINEES
DROP TABLE IF EXISTS trainee CASCADE;
CREATE TABLE trainee (
    traineeId SERIAL PRIMARY KEY,
    perId VARCHAR(100) UNIQUE,
    instructorId INT, -- store reference to the instructor trainee is assigned to
    FOREIGN KEY (perId) REFERENCES person(perId),
    FOREIGN KEY (instructorId) REFERENCES instructor(instructorId)
);

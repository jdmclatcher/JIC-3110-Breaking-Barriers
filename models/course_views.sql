-- View for administrators to view modules
DROP VIEW IF EXISTS admin_modules;
CREATE OR REPLACE VIEW admin_modules AS
SELECT
    m.module_id,
    m.title AS module_title,
    m.details AS module_details,
    m.administrator_id
FROM modules m;

-- View for instructors to view their assigned courses
DROP VIEW IF EXISTS instructor_courses;
CREATE OR REPLACE VIEW instructor_courses AS
SELECT
    c.course_id,
    c.title AS course_title,
    c.description AS course_description,
    c.instructor_id,
    c.module_id
FROM courses c;

-- View for trainees to view their assigned courses
DROP VIEW IF EXISTS trainee_courses;
CREATE OR REPLACE VIEW trainee_courses AS
SELECT
    c.course_id,
    c.title AS course_title,
    c.description AS course_description,
    c.instructor_id,
    c.module_id
FROM courses c
WHERE c.instructor_id = (SELECT instructor_id FROM trainee WHERE per_id = current_user);

-- View for trainees to view their assigned modules
DROP VIEW IF EXISTS trainee_modules;
CREATE OR REPLACE VIEW trainee_modules AS
SELECT
    m.module_id AS module_id,
    m.title AS title,
    m.details AS details,
    m.administrator_id AS administrator_id,
    m.instructor_id AS instructor_id,
    p.first_name AS instructor_first_name,
    p.last_name AS instructor_last_name,
    tm.trainee_id AS trainee_id,
    p2.first_name AS trainee_first_name,
    p2.last_name AS trainee_last_name,
    p2.email AS trainee_email
FROM modules m
LEFT JOIN person p on m.instructor_id = p.per_id
INNER JOIN trainee_assigned_to_module tm on m.module_id = tm.module_id
LEFT JOIN person p2 on tm.trainee_id = p2.per_id;

-- View for details on module
DROP VIEW IF EXISTS module_details;
CREATE OR REPLACE VIEW module_details AS
SELECT
    m.module_id AS module_id,
    m.title AS title,
    m.details AS details,
    m.administrator_id AS administrator_id,
    m.instructor_id AS instructor_id,
    p.first_name AS instructor_first_name,
    p.last_name AS instructor_last_name
FROM modules m
LEFT JOIN person p on m.instructor_id = p.per_id;

-- View for instructors and trainees to view pages for a specific course
DROP VIEW IF EXISTS course_pages;
CREATE OR REPLACE VIEW course_pages AS
SELECT
    p.page_id,
    p.title AS page_title,
    p.content AS page_content,
    p.course_id
FROM pages p;

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

-- View for instructors and trainees to view pages for a specific course
DROP VIEW IF EXISTS course_pages;
CREATE OR REPLACE VIEW course_pages AS
SELECT
    p.page_id,
    p.title AS page_title,
    p.content AS page_content,
    p.course_id
FROM pages p;

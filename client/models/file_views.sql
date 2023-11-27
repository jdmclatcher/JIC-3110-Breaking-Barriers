-- View to retrieve all files for a specific instructor
DROP VIEW IF EXISTS view_instructor_files;
CREATE OR REPLACE VIEW view_instructor_files AS
SELECT
    f.file_id,
    f.file_name,
    f.uploaded_at,
    i.per_id AS instructor_per_id
FROM files AS f
JOIN instructor AS i ON f.instructor_id = i.per_id;

-- View to retrieve all files for a specific student (based on instructor they are assigned to)
DROP VIEW IF EXISTS view_trainee_files;
CREATE OR REPLACE VIEW view_trainee_files AS
SELECT
    f.file_id,
    f.file_name,
    f.uploaded_at,
    a.instructor_id AS instructor_per_id,
    a.trainee_id as trainee_per_id
FROM files AS f
JOIN assigned_to AS a ON f.instructor_id = a.instructor_id;
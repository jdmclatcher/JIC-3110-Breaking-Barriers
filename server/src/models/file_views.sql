CREATE OR REPLACE VIEW view_instructor_files AS
SELECT
    f.file_id,
    f.file_name,
    f.uploaded_at,
    i.per_id
FROM files AS f
JOIN instructor AS i ON f.instructor_id = i.per_id;
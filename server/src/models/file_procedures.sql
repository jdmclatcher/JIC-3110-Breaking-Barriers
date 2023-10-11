-- Procedure to add a file for an instructor
CREATE OR REPLACE PROCEDURE upload_file(
    p_instructor_id VARCHAR(100),
    p_file_name TEXT,
    p_file_url TEXT
)  LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO files (instructor_id, file_name, file_url)
    VALUES (p_instructor_id, p_file_name, p_file_url);
END;
$$;
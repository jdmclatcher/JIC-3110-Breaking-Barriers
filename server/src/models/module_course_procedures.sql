-- Procedure for an administrator to create a module and assign an instructor:
-- Drop the procedure if it exists
DROP PROCEDURE IF EXISTS create_module_and_assign_instructor(
    VARCHAR, VARCHAR, TEXT, VARCHAR
);
-- Create or replace the procedure
CREATE OR REPLACE PROCEDURE create_module_and_assign_instructor(
    i_admin_id VARCHAR, i_module_title VARCHAR, i_module_details TEXT, i_instructor_id VARCHAR
) LANGUAGE plpgsql AS $$
BEGIN
    -- Insert a new module
    INSERT INTO modules (title, details, administrator_id, instructor_id)
    VALUES (i_module_title, i_module_details, i_admin_id, i_instructor_id);
END;
$$;

-- Procedure for an instructor to create a course (for the module they are assigned to):
-- Drop the procedure if it exists
DROP PROCEDURE IF EXISTS create_course(
    VARCHAR, INT, VARCHAR, TEXT
);
-- Create or replace the procedure
CREATE OR REPLACE PROCEDURE create_course(
    i_instructor_id VARCHAR, i_module_id INT, i_course_title VARCHAR, i_course_description TEXT
) LANGUAGE plpgsql AS $$
BEGIN
    -- Ensure the instructor is assigned to the module
    IF EXISTS (SELECT 1 FROM modules WHERE module_id = i_module_id AND instructor_id = i_instructor_id) THEN
        -- Insert a new course
        INSERT INTO courses (title, description, instructor_id, module_id)
        VALUES (i_course_title, i_course_description, i_instructor_id, i_module_id);
    ELSE
        RAISE EXCEPTION 'Instructor is not assigned to the specified module.';
    END IF;
END;
$$;

-- Procedure for an instructor to create pages inside a specific course:
-- Drop the procedure if it exists
DROP PROCEDURE IF EXISTS create_page(
    VARCHAR, INT, VARCHAR, TEXT
);

-- Create or replace the procedure
CREATE OR REPLACE PROCEDURE create_page(
    i_instructor_id VARCHAR, i_course_id INT, i_page_title VARCHAR, i_page_content TEXT
) LANGUAGE plpgsql AS $$
BEGIN
    -- Ensure the instructor is the creator of the course
    IF EXISTS (SELECT 1 FROM courses WHERE course_id = i_course_id AND instructor_id = i_instructor_id) THEN
        -- Insert a new page
        INSERT INTO pages (title, content, course_id)
        VALUES (i_page_title, i_page_content, i_course_id);
    ELSE
        RAISE EXCEPTION 'Instructor is not the creator of the specified course.';
    END IF;
END;
$$;

-- Procedure for an administrator to create a module and assign an instructor:
-- Drop the procedure if it exists
DROP PROCEDURE IF EXISTS create_module_and_assign_instructor(
    VARCHAR, VARCHAR, TEXT, VARCHAR
);
-- Create or replace the procedure
CREATE OR REPLACE PROCEDURE create_module_and_assign_instructor(
    admin_id VARCHAR, module_title VARCHAR, module_details TEXT, instructor_id VARCHAR
) LANGUAGE plpgsql AS $$
BEGIN
    -- Insert a new module
    INSERT INTO modules (title, details, administrator_id)
    VALUES (module_title, module_details, admin_id);

    -- Assign an instructor to the module
    UPDATE instructor
    SET instructor_id = admin_id
    WHERE per_id = instructor_id;
END;
$$;

-- Procedure for an instructor to create a course (for the module they are assigned to):
-- Drop the procedure if it exists
DROP PROCEDURE IF EXISTS create_course(
    VARCHAR, INT, VARCHAR, TEXT
);
-- Create or replace the procedure
CREATE OR REPLACE PROCEDURE create_course(
    instructor_id VARCHAR, module_id INT, course_title VARCHAR, course_description TEXT
) LANGUAGE plpgsql AS $$
BEGIN
    -- Ensure the instructor is assigned to the module
    IF EXISTS (SELECT 1 FROM modules WHERE module_id = module_id AND administrator_id = instructor_id) THEN
        -- Insert a new course
        INSERT INTO courses (title, description, instructor_id, module_id)
        VALUES (course_title, course_description, instructor_id, module_id);
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
    instructor_id VARCHAR, course_id INT, page_title VARCHAR, page_content TEXT
) LANGUAGE plpgsql AS $$
BEGIN
    -- Ensure the instructor is the creator of the course
    IF EXISTS (SELECT 1 FROM courses WHERE course_id = course_id AND instructor_id = instructor_id) THEN
        -- Insert a new page
        INSERT INTO pages (title, content, course_id)
        VALUES (page_title, page_content, course_id);
    ELSE
        RAISE EXCEPTION 'Instructor is not the creator of the specified course.';
    END IF;
END;
$$;

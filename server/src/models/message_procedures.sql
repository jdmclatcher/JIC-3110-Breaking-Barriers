-- Post a message
CREATE OR REPLACE PROCEDURE post_message(
    i_instructor_id VARCHAR(100),
    i_message_text TEXT
) LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO messages (text_content, instructor_id)
    VALUES (i_message_text, i_instructor_id);
END;
$$;

-- Mark a message as resolved
CREATE OR REPLACE PROCEDURE resolve_message(
    i_message_id INT
) LANGUAGE plpgsql AS $$
BEGIN
    UPDATE messages SET resolved = TRUE WHERE message_id = i_message_id;
END;
$$;

-- Delete a message
CREATE OR REPLACE PROCEDURE delete_message(
    i_message_id INT
) LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM messages WHERE message_id = i_message_id;
END;
$$;
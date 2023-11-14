-- View for instructors to view their own messages
CREATE OR REPLACE VIEW instructor_messages AS
SELECT
    message_id,
    text_content,
    resolved,
    created_at
FROM messages
WHERE instructor_id = current_user;

-- View for administrators to view all messages
CREATE OR REPLACE VIEW admin_messages AS
SELECT
    message_id,
    text_content,
    instructor_id,
    resolved,
    created_at
FROM messages;

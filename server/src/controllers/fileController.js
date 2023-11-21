const asyncHandler = require("express-async-handler");
const { db } = require("../configs/config");

// Instructor Create Quiz
exports.file_upload_post = asyncHandler(async (req, res, next) => {
    try {
        const { instructor_id, file_name, file_url } = req.params; 
        const { data, error } = await db.rpc('f_upload_file', {
          p_instructor_id: instructor_id,
          p_file_name: file_name,
          p_file_url: file_url,
        });
    
        if (error) {
          console.error('Error uploading file:', error.message);
          return { success: false, message: 'Failed to upload file' };
        } else {
          return { success: true, message: `${file_name} successfully uploaded` };
        }
      } catch (error) {
        console.error('Unexpected error:', error.message);
        return { success: false, message: 'An unexpected error occurred' };
      }
    }
);
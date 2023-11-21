const asyncHandler = require("express-async-handler");
const { db } = require("../configs/config");

// Instructor Get Courses
exports.course_instructor_get = asyncHandler(async (req, res, next) => {
    try {
        const { instructor_id } = req.query;
        const { data, error } = await db
          .from('courses')
          .select('*')
          .eq('instructor_id', instructor_id);
    
        if (error) {
          console.error('Error getting courses:', error.message);
          return { success: false, message: 'Failed to get courses' };
        } else {
          return { success: true, courseList: data };
        }
      } catch (error) {
        console.error('Unexpected error:', error.message);
        return { success: false, message: 'An unexpected error occurred' };
      }
    }
);

// Instructor Create Course
exports.course_create_post = asyncHandler(async (req, res, next) => {
    try {
        const { instructor_id, module_id, course_title, course_description } = req.body;
        const { data, error } = await db.rpc('f_create_course', {
          i_instructor_id: instructor_id,
          i_module_id: module_id,
          i_course_title : course_title,
          i_course_description: course_description,
        });
    
        if (error) {
          console.error('Error creating course:', error.message);
          return { success: false, message: 'Failed to create course' };
        } else {
          return { success: true, message: `${course_title} successfully created` };
        }
      } catch (error) {
        console.error('Unexpected error:', error.message);
        return { success: false, message: 'An unexpected error occurred' };
      }
    }
);

// Instructor Delete Course
exports.course_delete_post = asyncHandler(async (req, res, next) => {
    try {
        const { course_id } = req.query;

        const { data, error } = await db.rpc('f_delete_course', { i_course_id: course_id });
    
        if (error) {
          console.error('Error deleting course:', error.message);
          return { success: false, message: 'Failed to delete course' };
        } else {
          return { success: true, message: 'Course successfully deleted' };
        }
      } catch (error) {
        console.error('Unexpected error:', error.message);
        return { success: false, message: 'An unexpected error occurred' };
      }
    }
);

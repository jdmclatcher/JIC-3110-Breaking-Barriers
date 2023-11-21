const asyncHandler = require("express-async-handler");
const { db } = require("../configs/config");

// Admin Get Modules
exports.modules_administrator_get = asyncHandler(async (req, res, next) => {
    try {
        const { administrator_id } = req.query;
        const { data, error } = await db
          .from('modules')
          .select('*')
          .eq('administrator_id', administrator_id);
    
        if (error) {
          console.error('Error getting modules:', error.message);
          return { success: false, message: 'Failed to get modules' };
        } else {
          return { success: true, moduleList: data };
        }
      } catch (error) {
        console.error('Unexpected error:', error.message);
        return { success: false, message: 'An unexpected error occurred' };
      }
    }
);

// Administrator Create Module
exports.module_create_post = asyncHandler(async (req, res, next) => {
    try {
        const { administrator_id, module_title, module_details, instructor_id } = req.body;
        const { data, error } = await db.rpc('f_create_module_and_assign_instructor', {
          i_admin_id: administrator_id,
          i_module_title: module_title,
          i_module_details: module_details,
          i_instructor_id: instructor_id,
        });
    
        if (error) {
          console.error('Error creating module:', error.message);
          return { success: false, message: 'Failed to create module' };
        } else {
          return { success: true, message: `${module_title} successfully created` };
        }
      } catch (error) {
        console.error('Unexpected error:', error.message);
        return { success: false, message: 'An unexpected error occurred' };
      }
    }
);

// Administrator Delete Module
exports.module_delete_post = asyncHandler(async (req, res, next) => {
    try {
        const { module_id } = req.query;
        const { data, error } = await db.rpc('f_delete_module', { i_module_id: module_id });
    
        if (error) {
          console.error('Error deleting module:', error.message);
          return { success: false, message: 'Failed to delete module' };
        } else {
          return { success: true, message: 'Module successfully deleted' };
        }
      } catch (error) {
        console.error('Unexpected error:', error.message);
        return { success: false, message: 'An unexpected error occurred' };
      }
    }
);

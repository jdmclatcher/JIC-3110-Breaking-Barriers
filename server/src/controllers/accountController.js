const asyncHandler = require("express-async-handler");
const { db } = require("../configs/config");

exports.create_account = asyncHandler(async (req, res, next) => {
    try {
        const { userType, p_per_id, email, firstName, lastName, password } = req.body;
        // First, add a new person to the person table
        const { data: personData, error: personError } = await db.rpc('f_create_person', {
          p_per_id,
          p_email: email,
          p_first_name: firstName,
          p_last_name: lastName,
          p_password: password,
        });
    
        if (personError || !personData) {
          console.error('Failed to add to person table:', personError?.message || 'No data returned');
          return { success: false, message: 'Failed to add to person table' };
        }
    
        let queryString = "";
        let queryParameters =  { p_per_id };
    
        // Then, add the new person to the corresponding user type table
        if (userType === "admin") {
          queryString = "f_create_admin";
        } else if (userType === "instructor") {
          queryString = "f_create_instructor";
        } else if (userType === "trainee") {
          queryString = "f_create_trainee";
        }
    
        const { data: userTypeData, error: userTypeError } = await db.rpc(queryString, queryParameters);
    
        if (userTypeError || !userTypeData) {
          console.error('Failed to create account:', userTypeError?.message || 'No data returned');
          return { success: false, message: 'Failed to create account' };
        }
    
        return { success: true, message: `Account ${p_per_id} successfully created` };
      } catch (error) {
        console.error('Unexpected error:', error.message);
        return { success: false, message: 'An unexpected error occurred' };
      }
    }
);

exports.instructor_get = asyncHandler(async (req, res, next) => {
    try {
        const { data, error } = await db
        .from('instructor')
        .select('per_id');
    
        if (error) {
          console.error('Error getting instructors:', error.message);
          return { success: false, message: 'Failed to get instructors' };
        } else {
          return { success: true, instructorList: data };
        }
      } catch (error) {
        console.error('Unexpected error:', error.message);
        return { success: false, message: 'An unexpected error occurred' };
      }
    }
);

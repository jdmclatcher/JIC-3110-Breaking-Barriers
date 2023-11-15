const asyncHandler = require("express-async-handler");
const db = require("../configs/config");

// Instructor Get Courses
exports.course_instructor_get = asyncHandler(async (req, res, next) => {
    try {
        let { instructor_id } = req.query;

        let queryString = "SELECT * FROM instructor_courses WHERE instructor_id = $1";
        let queryParameters = [instructor_id];
        db.query(queryString, queryParameters, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.json({success: false, message: "Failed to get courses"});
            } else {
                res.status(200);
                res.json({ courseList: result.rows });
            }
        })
    } catch {
        console.log("error");
    }
});

// Instructor Create Course
exports.course_create_post = asyncHandler(async (req, res, next) => {
    try {
        let {
            instructor_id,
            module_id,
            course_title,
            course_description,
        } = req.body;

        let queryString = "CALL create_course($1, $2, $3, $4)";
        let queryParameters = [instructor_id, module_id, course_title, course_description];
        db.query(queryString, queryParameters, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.json({success: false, message: "Failed to create course"});
            } else {
                res.status(200);
                res.json({success: true, message: `${course_title} successfully created`});
            }
        })
    } catch {
        console.log("error");
    }
});

// Instructor Delete Course
exports.course_delete_post = asyncHandler(async (req, res, next) => {
    try {
        let { course_id } = req.query;

        let queryString = "CALL delete_course($1)";
        let queryParameters = [course_id];
        db.query(queryString, queryParameters, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.json({success: false, message: "Failed to delete course"});
            } else {
                res.status(200);
                res.json({success: true, message: "Course successfully deleted"});
            }
        })
    } catch {
        console.log("error");
    }
});

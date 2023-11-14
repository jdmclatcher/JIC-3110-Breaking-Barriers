const asyncHandler = require("express-async-handler");
const db = require("../configs/config");

// Admin Get Modules
exports.modules_administrator_get = asyncHandler(async (req, res, next) => {
    try {
        let { administrator_id } = req.query;

        let queryString = "SELECT * FROM admin_modules WHERE administrator_id = $1";
        let queryParameters = [administrator_id];
        db.query(queryString, queryParameters, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.json({success: false, message: "Failed to get modules"});
            } else {
                res.status(200);
                res.json({ moduleList: result.rows });
            }
        })
    } catch {
        console.log("error");
    }
});

// Administrator Create Module
exports.module_create_post = asyncHandler(async (req, res, next) => {
    try {
        let {
            administrator_id,
            instructor_id,
            module_title,
            module_details,
        } = req.body;

        let queryString = "CALL create_module_and_assign_instructor($1, $2, $3, $4)";
        let queryParameters = [administrator_id, module_title, module_details, instructor_id];
        db.query(queryString, queryParameters, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.json({success: false, message: "Failed to create module"});
            } else {
                res.status(200);
                res.json({success: true, message: `${module_title} successfully created`});
            }
        })
    } catch {
        console.log("error");
    }
});

// Administrator Delete Module
exports.module_delete_post = asyncHandler(async (req, res, next) => {
    try {
        let { module_id } = req.query;

        let queryString = "CALL delete_module($1)";
        let queryParameters = [module_id];
        db.query(queryString, queryParameters, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.json({success: false, message: "Failed to delete module"});
            } else {
                res.status(200);
                res.json({success: true, message: "Module successfully deleted"});
            }
        })
    } catch {
        console.log("error");
    }
});

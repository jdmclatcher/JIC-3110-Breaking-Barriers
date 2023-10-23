const asyncHandler = require("express-async-handler");
const db = require("../configs/config");

// Instructor Create Quiz
exports.file_upload_post = asyncHandler(async (req, res, next) => {
    try {
        let {
            instructor_id,
            file_name,
            file_url,
        } = req.body;

        let queryString = "CALL upload_file($1, $2, $3)";
        let queryParameters = [instructor_id, file_name, file_url];
        db.query(queryString, queryParameters, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.json({success: false, message: "Failed to upload file"});
            } else {
                res.status(200);
                res.json({success: true, message: `${file_name} successfully uploaded`});
            }
        })
    } catch {
        console.log("error");
    }
});
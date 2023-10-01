const asyncHandler = require("express-async-handler");
const db = require("../configs/config");

// Create Quiz
exports.quiz_create_post = asyncHandler(async (req, res, next) => {
    try {
        let {
            instructor_id,
            quiz_title,
            quiz_description,
            quiz_questions
        } = req.body;
        quiz_questions = JSON.stringify(quiz_questions);

        let queryString = "CALL create_quiz($1, $2, $3, $4)";
        let queryParameters = [instructor_id, quiz_title, quiz_description, quiz_questions];
        db.query(queryString, queryParameters, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.json({success: false, message: "Failed to create quiz"});
            } else {
                res.status(200);
                res.json({success: true, message: `${quiz_title} successfully created`});
            }
        })
    } catch {
        console.log("error");
    }
});

// Edit Quiz
exports.quiz_edit_patch = asyncHandler(async (req, res, next) => {
    try {
        let {
            quiz_id,
            quiz_title,
            quiz_description,
            quiz_questions
        } = req.body;
        quiz_questions = JSON.stringify(quiz_questions);

        let queryString = "CALL edit_quiz($1, $2, $3, $4)";
        let queryParameters = [quiz_id, quiz_title, quiz_description, quiz_questions];
        db.query(queryString, queryParameters, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.json({success: false, message: "Failed to edit quiz"});
            } else {
                res.status(200);
                res.json({success: true, message: `${quiz_title} successfully edited`});
            }
        })
    } catch {
        console.log("error");
    }
});

// Assign Quiz
exports.quiz_assign_post = asyncHandler(async (req, res, next) => {
    res.send("hi");
});

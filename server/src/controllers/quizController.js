const asyncHandler = require("express-async-handler");
const db = require("../configs/config");

// Instructor Create Quiz
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

// Instructor Edit Quiz
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

// Get Trainee Quizzes
exports.quiz_trainee_get = asyncHandler(async (req, res, next) => {
    try {
        let { trainee_id } = req.query;
        let queryString = "SELECT * FROM view_quizzes_for_trainee WHERE trainee_per_id = $1";
        let queryParameters = [trainee_id];
        db.query(queryString, queryParameters, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.json({success: false, message: "Failed to fetch quizzes."});
            } else {
                res.status(200);
                res.json({ quizList: result.rows });
            }
        })
    } catch {
        console.log("error");
    }
});

// Trainee Submit Quiz
exports.quiz_submit_post = asyncHandler(async (req, res, next) => {
    try {
        let {
            trainee_id,
            quiz_id,
            question_responses
        } = req.body;
        question_responses = JSON.stringify(question_responses);

        let queryString = "CALL submit_quiz($1, $2, $3)";
        let queryParameters = [trainee_id, quiz_id, question_responses];
        db.query(queryString, queryParameters, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.json({success: false, message: "Failed to submit quiz"});
            } else {
                res.status(200);
                res.json({success: true, message: "Quiz successfully submitted."});
            }
        })
    } catch {
        console.log("error");
    }
});

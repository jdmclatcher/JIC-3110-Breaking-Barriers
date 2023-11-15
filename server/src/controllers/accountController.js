const asyncHandler = require("express-async-handler");
const db = require("../configs/config");

exports.create_account = asyncHandler(async (req, res, next) => {
    let {
        userType,
        email,
        firstName,
        lastName,
        username,
        password,
        traineeInstructorId
    } = req.body
    // First add new person to person table
    try {
        let queryString = "CALL create_person($1, $2, $3, $4, $5)";
        let queryParameters = [username, email, firstName, lastName, password]
        await db.query(queryString, queryParameters)
    } catch(err) {
        console.log(err)
        res.status(500);
        res.json({success: false, message: "Failed to add to person table"});
    }

    // Then add new person to corresponding user type table
    try {
        let queryString = ""
        let queryParameters = [username];
        if (userType === "admin") {
            queryString = "CALL create_admin($1)"
        } else if (userType === "instructor") {
            queryString = "CALL create_instructor($1)"
        } else if (userType === "trainee") {
            queryString = "CALL create_trainee($1, $2)"
            queryParameters.push(traineeInstructorId)
        }
        await db.query(queryString, queryParameters)
    } catch(err) {
        console.log(err);
        res.status(500);
        res.json({success: false, message: "Failed to create account"});
    }
    res.status(200);
    res.json({success: true, message: `account ${username} successfully created`});
});

exports.instructor_get = asyncHandler(async (req, res, next) => {
    try {
        let queryString = "SELECT first_name, last_name, instructor.per_id from instructor INNER JOIN person ON instructor.per_id = person.per_id";
        let queryParameters = [];
        db.query(queryString, queryParameters, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.json({success: false, message: "Failed to get instructors"});
            } else {
                res.status(200);
                res.json({ instructorList: result.rows });
            }
        })
    } catch {
        console.log("error");
    }
});

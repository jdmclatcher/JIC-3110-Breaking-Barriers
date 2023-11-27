const asyncHandler = require("express-async-handler");
const { db } = require("../configs/config");
let bcrypt = require("bcryptjs");

exports.create_account = asyncHandler(async (req, res, next) => {
  try {
    const { userType, p_per_id, email, firstName, lastName, password } =
      req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    // First, add a new person to the person table
    let { data, error } = await db.rpc("f_create_person", {
      p_per_id,
      p_email: email,
      p_first_name: firstName,
      p_last_name: lastName,
      p_password: hash,
      p_role: userType,
    });

    if (error) {
      console.error(
        "Failed to add to person table:",
        error?.message || "No data returned"
      );
      res.json({
        success: false,
        message: `Failed to add to person table ${error?.message}`,
      });
      return;
    }

    let queryString = "";
    let queryParameters = { p_per_id };

    // Then, add the new person to the corresponding user type table
    if (userType === "admin") {
      queryString = "f_create_admin";
    } else if (userType === "instructor") {
      queryString = "f_create_instructor";
    } else if (userType === "trainee") {
      queryString = "f_create_trainee";
    }

    let { data: userTypeData, error: userTypeError } = await db.rpc(
      queryString,
      queryParameters
    );

    if (userTypeError) {
      console.error(
        "Failed to create account:",
        userTypeError?.message || "No data returned"
      );
      res.json({
        success: false,
        message: `Failed to create account: ${userTypeError?.message}`,
      });
      return;
    }

    res.json({
      success: true,
      message: `Account ${p_per_id} successfully created`,
    });
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.json({ success: false, message: "An unexpected error occurred" });
  }
});

exports.login = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Get hashed password from database
    let { data, error } = await db
      .from("person")
      .select("password")
      .eq("email", email);

    if (error || !data.length) {
      console.log(
        "Login failed:",
        error?.message || "Please check your credentials"
      );
      res.status(500);
      res.json({
        success: false,
        message: error?.message || "Please check your credentials",
      });
      return;
    } else {
      const storedPassword = data[0].password;
      const isValid = bcrypt.compareSync(password, storedPassword);
      if (!isValid) {
        res.status(500);
        res.json({
          success: false,
          message: error?.message || "Please check your credentials",
        });
        return;
      }
      req.session.userid = req.body.username;
      res.status(200);
      res.json({
        success: true,
        message: "Login successful",
      });
    }
  } catch (e) {
    console.log(e);
  }
});

exports.logout = asyncHandler(async (req, res, next) => {
  try {
    res.redirect("/login");
  } catch (e) {
    console.log(e);
  }
});

exports.instructor_get = asyncHandler(async (req, res, next) => {
  try {
    const { data, error } = await db.from("instructor").select("per_id");

    if (error) {
      console.error("Error getting instructors:", error.message);
      return { success: false, message: "Failed to get instructors" };
    } else {
      return { success: true, instructorList: data };
    }
  } catch (error) {
    console.error("Unexpected error:", error.message);
    return { success: false, message: "An unexpected error occurred" };
  }
});

const express = require("express");
const router = express.Router();

const course_controller = require("../controllers/courseController");

// Course Routes
router.get("/get-instructor", course_controller.course_instructor_get);
router.post("/create", course_controller.course_create_post);
router.post("/delete", course_controller.course_delete_post);

module.exports = router;

const express = require("express");
const router = express.Router();

const quiz_controller = require("../controllers/quizController");

// Quiz Routes
router.post("/create", quiz_controller.quiz_create_post);
router.patch("/edit", quiz_controller.quiz_create_post);
router.get("/trainee_get", quiz_controller.quiz_trainee_get);
router.post("/submit", quiz_controller.quiz_submit_post);

module.exports = router;

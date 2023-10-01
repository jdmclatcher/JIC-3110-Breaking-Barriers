const express = require("express");
const router = express.Router();

const quiz_controller = require("../controllers/quizController");

// Quiz Routes
router.post("/create", quiz_controller.quiz_create_post);
router.patch("/edit", quiz_controller.quiz_create_post);

module.exports = router;

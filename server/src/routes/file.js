const express = require("express");
const router = express.Router();

const file_controller = require("../controllers/fileController");

// File Routes
router.post("/upload", file_controller.file_upload_post);

module.exports = router;
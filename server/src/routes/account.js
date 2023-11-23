const express = require("express");
const router = express.Router();

const account_controller = require("../controllers/accountController");

// Account Routes
router.post("/create", account_controller.create_account);
router.get("/instructors", account_controller.instructor_get);

module.exports = router;

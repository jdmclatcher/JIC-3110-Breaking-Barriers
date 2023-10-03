const express = require("express");
const router = express.Router();

const account_controller = require("../controllers/accountController");

// Account Routes
router.post("/create-account", account_controller.create_account);

module.exports = router;

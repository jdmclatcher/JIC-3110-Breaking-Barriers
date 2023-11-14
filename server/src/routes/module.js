const express = require("express");
const router = express.Router();

const module_controller = require("../controllers/moduleController");


//Module Routes
router.get("/get-administrator", module_controller.modules_administrator_get);
router.post("/create", module_controller.module_create_post);
router.post("/delete", module_controller.module_delete_post);

module.exports = router;
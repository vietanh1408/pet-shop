const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const controller = require("../controllers/category.controller");

router.post("/", verifyToken, controller.create);

module.exports = router;
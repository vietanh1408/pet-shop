const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const verifyTokenAdmin = require("../middleware/auth_admin.middleware");

const controller = require("../controllers/upload.controller");

router.post("/", verifyToken, verifyTokenAdmin, controller.upload);

// router.post("/multi", verifyToken, verifyTokenAdmin, controller.uploadMulti);

router.put("/", verifyToken, verifyTokenAdmin, controller.delete);

module.exports = router;
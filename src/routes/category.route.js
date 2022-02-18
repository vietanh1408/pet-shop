const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const verifyTokenAdmin = require("../middleware/auth_admin.middleware");

const controller = require("../controllers/category.controller");

router.get("/", verifyToken, controller.categories);

router.get("/:id", verifyToken, controller.category);

router.post("/", verifyToken, verifyTokenAdmin, controller.create);

router.put("/", verifyToken, verifyTokenAdmin, controller.update);

router.delete("/:id", verifyToken, verifyTokenAdmin, controller.delete);

module.exports = router;
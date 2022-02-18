const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const controller = require("../controllers/user.controller");

router.get("/", verifyToken, controller.getUsers);

router.get("/:id", verifyToken, controller.getOne);

router.post("/", verifyToken, controller.create);

router.put("/", verifyToken, controller.update);

router.delete("/:id", verifyToken, controller.delete);

module.exports = router;
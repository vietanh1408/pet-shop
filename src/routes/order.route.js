const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const verifyTokenAdmin = require("../middleware/auth_admin.middleware");

const controller = require("../controllers/order.controller");

router.get("/", verifyToken, verifyTokenAdmin, controller.orders);

router.get("/:id", verifyToken, controller.order);

router.post("/", verifyToken, controller.create);

router.put("/", verifyToken, verifyTokenAdmin, controller.update);

module.exports = router;
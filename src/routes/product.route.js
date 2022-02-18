const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const controller = require("../controllers/product.controller");

router.get("/", verifyToken, controller.products);

router.get("/:id", verifyToken, controller.product);

router.post("/", verifyToken, controller.create);

router.put("/", verifyToken, controller.update);

router.delete("/:id", verifyToken, controller.delete);

module.exports = router;
const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");

const controller = require("../controllers/cart.controller");

router.get("/", controller.carts);

router.get("/add-to-cart/:id", controller.addToCart);

module.exports = router;
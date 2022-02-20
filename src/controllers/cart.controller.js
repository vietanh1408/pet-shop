const Cart = require("../helpers/cart");
const Product = require("../models/Product");

module.exports.carts = async(req, res) => {
    try {} catch (e) {
        return res.status(500).json({
            success: false,
            message: messages.SERVER_ERROR,
        });
    }
};

module.exports.addToCart = async(req, res) => {
    try {
        const productId = req.params.id;
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: messages.SERVER_ERROR,
        });
    }
};
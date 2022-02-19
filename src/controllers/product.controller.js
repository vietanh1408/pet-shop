const { messages } = require("../constants/error");
const Product = require("../models/Product");
const Pagination = require("../helpers/pagination");

module.exports.products = async(req, res) => {
    try {
        const productQuery = new Pagination(
            Product.find({}).populate("categoryId", ["name", "description", "image"]),
            req.query
        ).paginating();

        const products = await productQuery.query.sort({ createdAt: -1 });

        const total = await Product.countDocuments({});

        return res.status(200).json({
            success: true,
            result: {
                products,
                total,
            },
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: messages.SERVER_ERROR,
        });
    }
};

module.exports.product = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate(
            "categoryId", ["name", "description", "image"]
        );

        if (!product) {
            return res.status(400).json({
                success: false,
                message: messages.PRODUCT_NOT_EXIST,
            });
        }

        return res.status(200).json({
            success: true,
            product,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: messages.SERVER_ERROR,
        });
    }
};

module.exports.create = async(req, res) => {
    try {
        if (!req.body.categoryId) {
            return res.status(400).json({
                success: false,
                message: messages.REQUIRED_CATEGORY,
            });
        }

        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            image1: req.body.image1,
            image2: req.body.image2,
            image3: req.body.image3,
            image4: req.body.image4,
            status: req.body.status,
            quantity: req.body.quantity,
            categoryId: req.body.categoryId,
        });

        const newProduct = await product.save();

        return res.status(201).json({
            success: true,
            product: newProduct,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: messages.SERVER_ERROR,
        });
    }
};

module.exports.update = async(req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.body.productId, {...req.body }, { new: true }
        );

        return res.status(200).json({
            success: true,
            product,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: messages.SERVER_ERROR,
        });
    }
};

module.exports.delete = async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: messages.SERVER_ERROR,
        });
    }
};
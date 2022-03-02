const { messages } = require("../constants/error");
const Product = require("../models/Product");
const Pagination = require("../helpers/pagination");
const { cloudinary } = require('../utils/cloudinary.connect');
const environments = require("../constants/environment");
require('dotenv').config();

module.exports.products = async (req, res) => {
    try {
        const searchQuery = req.query.keyword ?
            { name: { $regex: req.query.keyword, $options: "i" } } :
            {};

        const productQuery = new Pagination(
            Product.find({ ...searchQuery }).populate("categoryId", [
                "name",
                "description",
                "image",
            ]),
            req.query
        ).paginating();

        const products = await productQuery.query.sort({ createdAt: -1 });

        const total = await Product.countDocuments({ ...searchQuery });

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

module.exports.product = async (req, res) => {
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

module.exports.create = async (req, res) => {
    try {

        if (!req.body.categoryId) {
            return res.status(400).json({
                success: false,
                message: messages.REQUIRED_CATEGORY,
            });
        }

        if (req.body.image) {
            const fileStr = req.body.image;

            const uploadResponse = await cloudinary.uploader.upload(fileStr, {
                folder: environments.CLOUD_FOLDER,
            })

            if (!(uploadResponse.public_id && uploadResponse.url)) {
                return res.status(400).json({
                    success: false,
                    message: 'Tải ảnh lên không thành công'
                })
            } else {
                req.body.image = {
                    publicId: uploadResponse.public_id,
                    url: uploadResponse.url
                }
            }
        }

        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            image1: req.body.image,
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
        console.log('e....', e)
        return res.status(500).json({
            success: false,
            message: messages.SERVER_ERROR,
        });
    }
};

module.exports.update = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.body.productId, { ...req.body }, { new: true }
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

module.exports.delete = async (req, res) => {
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
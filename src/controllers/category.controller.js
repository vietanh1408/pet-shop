const Category = require("../models/Category");

module.exports.create = async(req, res) => {
    try {
        const category = new Category({
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
        });

        const newCategory = await category.save();

        return res.status(200).json({
            success: true,
            category: newCategory,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: messages.SERVER_ERROR,
        });
    }
};
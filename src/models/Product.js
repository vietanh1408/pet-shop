const { Schema, Types, model } = require("mongoose");

const ProductSchema = new Schema({
    name: {
        type: String,
        max: 1024,
    },
    price: {
        type: Number,
        default: 0,
    },
    image1: {
        type: String,
    },
    image2: {
        type: String,
    },
    image3: {
        type: String,
    },
    image4: {
        type: String,
    },
    status: {
        type: Number,
        enum: [0, 1],
    },
    quantity: {
        type: Number,
        default: 0,
    },
    categoryId: {
        type: Types.ObjectId,
        ref: "category",
    },
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = model("product", ProductSchema);
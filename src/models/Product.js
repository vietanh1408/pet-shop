const { Schema, Types, model } = require("mongoose");

const ProductSchema = new Schema({
    name: {
        type: String,
        unique: true,
        max: 1024,
    },
    price: {
        type: Number,
        default: 0,
    },
    image1: {
        type: String,
        default: null,
    },
    image2: {
        type: String,
        default: null,
    },
    image3: {
        type: String,
        default: null,
    },
    image4: {
        type: String,
        default: null,
    },
    status: {
        type: Number,
        enum: [0, 1],
        default: 0,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    categoryId: {
        type: Types.ObjectId,
        ref: "category",
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = model("product", ProductSchema);
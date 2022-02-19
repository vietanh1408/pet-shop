const { Schema, Types, model } = require("mongoose");

const ImageSchema = new Schema({
    publicId: String,
    url: String,
});

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
        type: ImageSchema,
        default: null,
    },
    image2: {
        type: ImageSchema,
        default: null,
    },
    image3: {
        type: ImageSchema,
        default: null,
    },
    image4: {
        type: ImageSchema,
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
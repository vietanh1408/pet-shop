const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
    name: {
        type: String,
        max: 1024,
    },
    description: {
        type: String,
        max: 1024,
    },
    image: {
        type: String,
    },
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = model("category", CategorySchema);
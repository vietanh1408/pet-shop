const { Schema, Types, model } = require("mongoose");

const OrderDetailSchema = new Schema({
    orderId: {
        type: Types.ObjectId,
        ref: "order",
    },
    productId: {
        type: Types.ObjectId,
        ref: "product",
    },
    productQuantity: {
        type: Number,
        default: 0,
    },
    categoryId: {
        type: Types.ObjectId,
        ref: "category",
    },
    subTotal: {
        type: Number,
        default: 0,
    },
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = model("orderDetail", OrderDetailSchema);
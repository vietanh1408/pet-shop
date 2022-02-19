const { Schema, Types, model } = require("mongoose");

const OrderSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    customerId: {
        type: Types.ObjectId,
        ref: "user",
        required: true,
    },
    byDate: {
        type: Date,
        default: Date.now(),
    },
    total: {
        type: Number,
        default: 0,
    },
}, {
    versionKey: false,
    timestamps: true,
});

OrderSchema.index({ code: 1 });

module.exports = model("order", OrderSchema);
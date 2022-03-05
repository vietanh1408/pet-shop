const { Schema, Types, model } = require("mongoose");

const OrderSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    customer: {
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
    phoneNumber: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    }
}, {
    versionKey: false,
    timestamps: true,
});

OrderSchema.index({ code: 1 });

module.exports = model("order", OrderSchema);
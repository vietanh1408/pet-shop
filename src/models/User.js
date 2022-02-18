const { Schema, model, Types } = require("mongoose");

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        default: null,
    },
    role: {
        type: Number,
        enum: [0, 1],
        default: 0,
    },
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = model("user", UserSchema);
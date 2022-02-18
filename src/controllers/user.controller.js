const { messages } = require("../constants/error");
const User = require("../models/User");
const { hashPassword } = require("../helpers/hashPassword");

module.exports.users = async(req, res) => {
    try {
        const users = await User.find({}).select(["-password"]);

        return res.status(200).json({
            success: true,
            users,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: messages.SERVER_ERROR,
        });
    }
};

module.exports.user = async(req, res) => {
    try {
        const user = await User.findById(req.params.id).select(["-password"]);

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: messages.SERVER_ERROR,
        });
    }
};

module.exports.create = async(req, res) => {
    try {
        const userExist = await User.findOne({
            username: req.body.username,
        }).select(["-password"]);
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: messages.USER_EXIST,
            });
        }

        // hash password
        const hashedPassword = await hashPassword(req.body.password);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            phoneNumber: req.body.phoneNumber,
            role: req.body.role,
        });

        const newUser = await user.save();

        const { password, ...result } = newUser._doc;

        return res.status(200).json({
            success: true,
            user: result,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: messages.SERVER_ERROR,
        });
    }
};

module.exports.update = async(req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.body.userId, {...req.body.data }, { new: true }
        ).select(["-password"]);

        if (!updatedUser) {
            return res.status(400).json({
                success: false,
                message: messages.USERNAME_NOT_EXIST,
            });
        }

        return res.status(200).json({
            success: true,
            user: updatedUser,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: messages.SERVER_ERROR,
        });
    }
};

module.exports.delete = async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

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
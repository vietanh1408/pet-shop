const User = require("../models/User");
const { messages } = require("../constants/error");
const { createAccessToken } = require("../helpers/generateToken");
const environments = require("../constants/environment");
const { hashPassword, comparePassword } = require("../helpers/hashPassword");

module.exports.register = async(req, res) => {
    try {
        // check email exist
        const existedEmail = await User.findOne({ email: req.body.email });

        if (existedEmail) {
            return res.status(400).json({
                success: false,
                message: messages.DUPLICATED_EMAIL,
            });
        }

        // check username
        const existedUsername = await User.findOne({ username: req.body.username });

        if (existedUsername) {
            return res.status(400).json({
                success: false,
                message: messages.DUPLICATED_USERNAME,
            });
        }

        // hashed password
        const hashedPassword = await hashPassword(req.body.password);

        // create user
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        const newUser = await user.save();

        // create access token
        const accessToken = await createAccessToken(
            newUser._id,
            environments.SECRET_TOKEN
        );

        const { password, ...result } = newUser._doc;

        return res.status(200).json({
            success: true,
            accessToken,
            user: result,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: messages.SERVER_ERROR,
        });
    }
};

// login
module.exports.login = async(req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: messages.USERNAME_NOT_EXIST,
            });
        }

        // check password
        const validPass = await comparePassword(req.body.password, user.password);

        if (!validPass) {
            return res.status(400).json({
                success: false,
                message: messages.INVALID_PASSWORD,
            });
        }

        // create access token
        const accessToken = await createAccessToken(
            user._id,
            environments.SECRET_TOKEN
        );

        const { password, ...result } = user._doc;

        return res.status(200).json({
            success: true,
            accessToken,
            user: result,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: messages.SERVER_ERROR,
        });
    }
};
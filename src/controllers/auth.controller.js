const User = require("../models/User");
const { messages } = require("../constants/error");
const bcrypt = require("bcryptjs");
const { createAccessToken } = require("../helpers/generateToken");
const environments = require("../constants/environment");

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
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        // create user
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
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
        const validPass = await bcrypt.compare(req.body.password, user.password);
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
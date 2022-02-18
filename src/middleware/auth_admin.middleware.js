const { messages } = require("../constants/error");
const User = require("../models/User");

const verifyTokenAdmin = async(req, res, next) => {
    try {
        const user = await User.findById(req.userId);

        if (user.role === 0) {
            return res.status(403).json({
                success: false,
                message: messages.AUTHORIZATION_ADMIN_ERROR,
            });
        }

        next();
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: messages.SERVER_ERROR,
        });
    }
};

module.exports = verifyTokenAdmin;
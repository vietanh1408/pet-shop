const jwt = require("jsonwebtoken");

module.exports.createAccessToken = (id, secretToken) => {
    try {
        return jwt.sign({ userId: id }, secretToken, { expiresIn: "90d" });
    } catch (err) {
        throw err;
    }
};
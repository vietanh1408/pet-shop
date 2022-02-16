require("dotenv").config();

const environments = {
    PORT: process.env.PORT || 4000,
    MONGO_URI: process.env.MONGO_URI || "",
    SECRET_TOKEN: process.env.SECRET_TOKEN || "pet_shop_ahihi",
};

module.exports = environments;
const cloudinary = require("cloudinary").v2;
const { messages } = require("../constants/error");
const environments = require("../constants/environment");

module.exports.upload = async(req, res) => {
    try {
        const fileStr = req.body.data;

        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: environments.CLOUD_FOLDER,
        });
        return res.status(200).json({
            success: true,
            images: {
                public_id: uploadResponse.public_id,
                url: uploadResponse.url,
            },
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
        if (!req.body.publicId) {
            return res.status(404).json({
                success: false,
                message: messages.FILE_NOT_EXIST,
            });
        }
        cloudinary.uploader.destroy(req.body.publicId, async(err, result) => {
            if (err) {
                throw err;
            }
            return res.status(200).json({
                success: true,
            });
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: messages.SERVER_ERROR,
        });
    }
};
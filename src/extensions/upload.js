const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { messages } = require("../constants/error");
const environments = require("../constants/environment");

module.exports.removePathFileUpload = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err;
    });
};

module.exports.uploadToCloud = async(file) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(
            file, {
                folder: environments.CLOUD_FOLDER,
            },
            (err, res) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: messages.UPLOAD_FAIL,
                    });
                }
                resolve({
                    url: res.url,
                    publicId: res.public_id,
                });
            }
        );
    });
};

module.exports.deleteImageFromCloudinary = async(post) => {
    if (post.image && post.image.publicId) {
        await cloudinary.uploader.destroy(
            post.image.publicId,
            async(err, result) => {
                if (err) {
                    throw err;
                }
            }
        );
    }
};
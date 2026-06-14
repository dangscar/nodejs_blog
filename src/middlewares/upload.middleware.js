const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);

        cb(
            null,
            `${Date.now()}-${Math.round(
                Math.random() * 1e9
            )}${ext}`
        );
    }
});

const fileFilter = (req, file, cb) => {

    const allowTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg"
    ];

    if (allowTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Chỉ hỗ trợ file PNG, JPG, JPEG"
            )
        );
    }
};

module.exports = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});
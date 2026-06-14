// src/routes/word.route.js

const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload.middleware");
const wordController = require(
    "../controllers/word.controller"
);

router.get("/", wordController.index);

router.post("/generate", upload.single("anhThe"),wordController.generate.bind(wordController));
router.post("/generate-bao-luu", upload.single("anhThe"),wordController.generateBaoLuu.bind(wordController));
router.post("/generate-hoc-lai", upload.single("anhThe"),wordController.generateHocLai.bind(wordController));
router.post("/generate-the-sinh-vien", upload.single("anhThe"),wordController.generateTheSinhVien.bind(wordController));
router.post("/generate-giay-gioi-thieu", upload.single("anhThe"),wordController.generateGiayGioiThieuThucTap.bind(wordController));
router.post("/generate-xac-nhan-kho-khan", upload.single("anhThe"),wordController.generateGiayXacNhanHCKK.bind(wordController));

module.exports = router;
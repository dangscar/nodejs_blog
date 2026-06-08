// src/routes/word.route.js

const express = require("express");

const router = express.Router();

const wordController = require(
    "../controllers/word.controller"
);

router.get("/", wordController.index);

router.post("/generate",wordController.generate.bind(wordController));
router.post("/generate-bao-luu",wordController.generateBaoLuu.bind(wordController));
router.post("/generate-hoc-lai", wordController.generateHocLai.bind(wordController));
router.post("/generate-the-sinh-vien", wordController.generateTheSinhVien.bind(wordController));

module.exports = router;
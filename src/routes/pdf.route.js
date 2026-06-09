const express = require("express");
const router = express.Router();

const pdfController = require("../controllers/pdf.controller");

router.post(
    "/generate-pdf",
    pdfController.generate
);

module.exports = router;
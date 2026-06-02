// src/routes/word.route.js

const express = require("express");

const router = express.Router();

const wordController = require(
    "../controllers/word.controller"
);

router.post(
    "/generate",
    wordController.generate
);

module.exports = router;
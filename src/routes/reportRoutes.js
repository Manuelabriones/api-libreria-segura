const express = require("express");

const router = express.Router();

const {
    financialReport
} = require("../controllers/reportController");

router.get("/financial", financialReport);

module.exports = router;
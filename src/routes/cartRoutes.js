const express = require("express");
const router = express.Router();

const {
    createCart,
    getCarts,
    getCartById,
    updateCart,
    deleteCart
} = require("../controllers/cartController");

router.post("/", createCart);
router.get("/", getCarts);
router.get("/:id", getCartById);
router.put("/:id", updateCart);
router.delete("/:id", deleteCart);

module.exports = router;
const Cart = require("../models/Cart");

// Crear carrito
exports.createCart = async (req, res) => {
    try {
        const cart = await Cart.create(req.body);
        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los carritos
exports.getCarts = async (req, res) => {
    try {
        const carts = await Cart.find()
            .populate("user")
            .populate("items.book");

        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener carrito por ID
exports.getCartById = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id)
            .populate("user")
            .populate("items.book");

        if (!cart) {
            return res.status(404).json({
                message: "Carrito no encontrado"
            });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar carrito
exports.updateCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!cart) {
            return res.status(404).json({
                message: "Carrito no encontrado"
            });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar carrito
exports.deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);

        if (!cart) {
            return res.status(404).json({
                message: "Carrito no encontrado"
            });
        }

        res.status(200).json({
            message: "Carrito eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
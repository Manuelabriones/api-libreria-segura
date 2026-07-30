const Order = require("../models/Order");

// Crear orden
exports.createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);

        res.status(201).json(order);

    } catch (error) {
        console.error("Error al crear la orden:", error);

        res.status(400).json({
            message: "Los datos enviados no son válidos."
        });
    }
};

// Obtener todas las órdenes
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user")
            .populate("items.book");

        res.status(200).json(orders);

    } catch (error) {
        console.error("Error al obtener las órdenes:", error);

        res.status(500).json({
            message: "Error interno del servidor."
        });
    }
};

// Obtener una orden por ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("user")
            .populate("items.book");

        if (!order) {
            return res.status(404).json({
                message: "Orden no encontrada."
            });
        }

        res.status(200).json(order);

    } catch (error) {
        console.error("Error al obtener la orden:", error);

        res.status(500).json({
            message: "Error interno del servidor."
        });
    }
};

// Actualizar orden
exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!order) {
            return res.status(404).json({
                message: "Orden no encontrada."
            });
        }

        res.status(200).json(order);

    } catch (error) {
        console.error("Error al actualizar la orden:", error);

        res.status(400).json({
            message: "Los datos enviados no son válidos."
        });
    }
};

// Eliminar orden
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Orden no encontrada."
            });
        }

        res.status(200).json({
            message: "Orden eliminada correctamente."
        });

    } catch (error) {
        console.error("Error al eliminar la orden:", error);

        res.status(500).json({
            message: "Error interno del servidor."
        });
    }
};
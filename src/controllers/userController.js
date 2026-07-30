const User = require("../models/User");

// Crear usuario
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json(user);

    } catch (error) {
        console.error("Error al crear el usuario:", error);

        res.status(400).json({
            message: "Los datos enviados no son válidos."
        });
    }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);

    } catch (error) {
        console.error("Error al obtener los usuarios:", error);

        res.status(500).json({
            message: "Error interno del servidor."
        });
    }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado."
            });
        }

        res.status(200).json(user);

    } catch (error) {
        console.error("Error al obtener el usuario:", error);

        res.status(500).json({
            message: "Error interno del servidor."
        });
    }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado."
            });
        }

        res.status(200).json(user);

    } catch (error) {
        console.error("Error al actualizar el usuario:", error);

        res.status(400).json({
            message: "Los datos enviados no son válidos."
        });
    }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado."
            });
        }

        res.status(200).json({
            message: "Usuario eliminado correctamente."
        });

    } catch (error) {
        console.error("Error al eliminar el usuario:", error);

        res.status(500).json({
            message: "Error interno del servidor."
        });
    }
};
const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {

    const token = req.headers["app-token"];

    if (!token) {
        return res.status(401).json({
            message: "App token requerido."
        });
    }

    if (!process.env.APP_SECRET) {
        console.error("Error: APP_SECRET no está configurado.");

        return res.status(500).json({
            message: "Error interno del servidor."
        });
    }

    try {

        jwt.verify(token, process.env.APP_SECRET);

        next();

    } catch (error) {

        console.error("Error al validar el token:", error);

        return res.status(401).json({
            message: "App token inválido."
        });

    }

};

module.exports = validateToken;
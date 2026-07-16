const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const token = req.headers["app-token"];

    if (!token) {
        return res.status(401).json({
            message: "App token requerido"
        });
    }

    try {
        jwt.verify(token, process.env.APP_SECRET);
        next();
    } catch (error) {
        return res.status(401).json({
            message: "App token inválido"
        });
    }
};

module.exports = validateToken;
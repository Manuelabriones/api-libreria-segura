require("dotenv").config();

const express = require("express");
const helmet = require("helmet");

const connectDB = require("./src/config/database");

const bookRoutes = require("./src/routes/bookRoutes");
const userRoutes = require("./src/routes/userRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const orderRoutes = require("./src/routes/orderRoutes");

const validateToken = require("./src/middleware/validateToken");

const app = express();

const PORT = process.env.PORT || 5100;

// Conectar a MongoDB
connectDB();

// Configuración de Helmet
app.use(
    helmet({
        frameguard: {
            action: "deny"
        }
    })
);

// Middleware
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
    res.status(200).json({
        message: "API Librería Segura funcionando correctamente"
    });
});

// Middleware de autenticación para toda la API
app.use(validateToken);

// Rutas protegidas
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log("Hello World");
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
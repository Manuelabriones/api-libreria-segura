require("dotenv").config();

const express = require("express");
const connectDB = require("./src/config/database");

const bookRoutes = require("./src/routes/bookRoutes");
const userRoutes = require("./src/routes/userRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const orderRoutes = require("./src/routes/orderRoutes");

const app = express();

const PORT = process.env.PORT || 5100;

// Conectar a MongoDB
connectDB();

app.use(express.json());

// Rutas
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);

// Solo iniciar el servidor cuando se ejecuta localmente
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log("Hello World");
        console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });
}

module.exports = app;
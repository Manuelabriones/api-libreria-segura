require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const connectDB = require("./src/config/database");

const app = express();

const PORT = process.env.PORT || 5100;

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(helmet());
app.use(express.json());

app.listen(PORT, () => {
    console.log("Hello World");
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
const mongoose = require("mongoose");

const connectDB = async () => {
    try {

        if (!process.env.MONGO_URI) {
            console.error("Error: La variable MONGO_URI no está definida.");
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB conectado correctamente");

    } catch (error) {

        console.error("Error al conectar con MongoDB.");
        process.exit(1);

    }
};

module.exports = connectDB;
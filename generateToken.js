require("dotenv").config();

const jwt = require("jsonwebtoken");

const payload = {
    app: "api-libreria-segura"
};

const token = jwt.sign(payload, process.env.APP_SECRET);

console.log("\nAPP TOKEN:\n");
console.log(token);
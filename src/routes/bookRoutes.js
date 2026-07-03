const express = require("express");
const router = express.Router();

const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

// Obtener todos los libros
router.get("/", getBooks);

// Obtener un libro por ID
router.get("/:id", getBookById);

// Crear un libro
router.post("/", createBook);

// Actualizar un libro
router.put("/:id", updateBook);

// Eliminar un libro
router.delete("/:id", deleteBook);

module.exports = router;
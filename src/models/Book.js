const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'El título es obligatorio'],
      trim: true,
      minlength: [1, 'El título no puede estar vacío'],
      maxlength: [300, 'El título no puede superar los 300 caracteres'],
    },
    authors: {
      type: [String],
      required: [true, 'Se requiere al menos un autor'],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'Debe incluir al menos un autor',
      },
    },
    isbn: {
      type: String,
      required: [true, 'El ISBN es obligatorio'],
      unique: true,
      trim: true,
      match: [/^(97(8|9))?\d{9}(\d|X)$/, 'Formato de ISBN inválido'],
    },
    genre: {
      type: [String],
      required: [true, 'El género es obligatorio'],
      enum: [
        'ficción',
        'no ficción',
        'ciencia ficción',
        'fantasía',
        'misterio',
        'thriller',
        'romance',
        'histórico',
        'biografía',
        'autoayuda',
        'ciencia',
        'tecnología',
        'arte',
        'infantil',
        'juvenil',
        'otro',
      ],
    },
    synopsis: {
      type: String,
      trim: true,
      maxlength: [2000, 'La sinopsis no puede superar los 2000 caracteres'],
    },
    publishedYear: {
      type: Number,
      min: [1000, 'Año de publicación inválido'],
      max: [new Date().getFullYear(), 'El año no puede ser futuro'],
    },
    publisher: {
      type: String,
      trim: true,
      maxlength: [150, 'El nombre de la editorial no puede superar 150 caracteres'],
    },
    language: {
      type: String,
      default: 'español',
      trim: true,
    },
    pageCount: {
      type: Number,
      min: [1, 'El número de páginas debe ser mayor a 0'],
    },
    stock: {
      type: Number,
      required: [true, 'El stock es obligatorio'],
      min: [0, 'El stock no puede ser negativo'],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
    coverImage: {
      type: String,
      trim: true,
      // Solo se almacena la ruta relativa o un ID de almacenamiento, nunca una URL externa sin validar
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Índices para búsquedas frecuentes en catálogo
bookSchema.index({ title: 'text', authors: 'text' });
bookSchema.index({ genre: 1, isActive: 1 });
bookSchema.index({ isbn: 1 });
bookSchema.index({ isPremiumOnly: 1, isActive: 1 });

module.exports = mongoose.model('Book', bookSchema);
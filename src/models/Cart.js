const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: [true, 'El libro es obligatorio'],
    },
    quantity: {
      type: Number,
      required: [true, 'La cantidad es obligatoria'],
      min: [1, 'La cantidad debe ser al menos 1'],
      max: [20, 'No se pueden agregar más de 20 unidades del mismo libro'],
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El usuario es obligatorio'],
      unique: true, // Un carrito por usuario
    },
    items: {
      type: [cartItemSchema],
      default: [],
    },
    // TTL de seguridad: el carrito expira si no hay actividad en 30 días
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      index: { expires: 0 }, // MongoDB TTL index
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

cartSchema.index({ user: 1 });

// Actualizar expiración al modificar el carrito
cartSchema.pre('save', function (next) {
  this.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  next();
});

module.exports = mongoose.model('Cart', cartSchema);
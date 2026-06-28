const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: [true, 'El libro de referencia es obligatorio'],
    },
    title: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: [true, 'La cantidad es obligatoria'],
      min: [1, 'La cantidad debe ser al menos 1'],
    },
    unitPrice: {
      type: Number,
      required: [true, 'El precio unitario es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El usuario es obligatorio'],
    },
    items: {
      type: [orderItemSchema],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: 'La orden debe tener al menos un artículo',
      },
    },
    subtotal: {
      type: Number,
      required: true,
      min: [0, 'El subtotal no puede ser negativo'],
    },
    taxes: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: [0, 'El total no puede ser negativo'],
    },
    status: {
      type: String,
      enum: ['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado', 'reembolsado'],
      default: 'pendiente',
    },
    paymentMethod: {
      type: String,
      enum: ['tarjeta', 'transferencia', 'paypal', 'otro'],
      required: [true, 'El método de pago es obligatorio'],
    },
    // Solo se guarda referencia/token del proveedor de pagos, NUNCA datos de tarjeta
    paymentReference: {
      type: String,
      trim: true,
      select: false,
    },
    shippingAddress: {
      street: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      postalCode: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true, default: 'México' },
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Las notas no pueden superar los 500 caracteres'],
    },
    paidAt: Date,
    deliveredAt: Date,
    cancelledAt: Date,
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.paymentReference;
        return ret;
      },
    },
  }
);

// Índices para reportes financieros y consultas por usuario
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1, createdAt: -1 });
orderSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Order', orderSchema);
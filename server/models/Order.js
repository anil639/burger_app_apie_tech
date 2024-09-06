const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  customerPhone: { type: String, required: true },
  burgerDetails: [{ slice: String, quantity: Number, price: Number }],
  totalPrice: Number,
});

module.exports = mongoose.model("Order", orderSchema);

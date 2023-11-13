const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  creationDate: { type: Date, default: Date.now },
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrls: [{ type: String, required: true }],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

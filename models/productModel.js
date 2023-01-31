// NPM MODULES
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  dsin: {
    type: 'String',
    trim: true,
    unique: true,
    required: [true, 'A product must have a dsin identifier'],
  },
  sln: {
    type: 'String',
    trim: true,
    maxLength: [100, 'Max 100 characters allowed for System Listing Name!'],
    minLength: [10, 'Min 10 characters allowed for System Listing Name!'],
    required: [true, 'A product must have a System Listing Name!'],
  },
  mrp: { type: 'Number', required: [true, 'A product must have a price'] },
  hsnCode: { type: 'String', trim: true, required: [true, 'A product must have a HSN Code!'] },
  gstSlab: {
    type: 'Number',
    enum: [0, 9, 18],
    default: 9,
  },
  unit: { type: 'String', trim: true, default: 'Pcs' },
  qty: {
    type: Number,
    default: 1,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

// NPM MODULES
const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// QUERY MIDDLEWARE
invoiceSchema.pre(/^find/, function (next) {
  this.populate({ path: 'products' });

  next();
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;

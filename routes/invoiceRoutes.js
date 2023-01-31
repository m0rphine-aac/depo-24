// NPM MODULES
const express = require('express');

// CUSTOM MODULES
const invoiceController = require('../controller/invoiceController');

const router = express.Router();

router.route('/').post(invoiceController.createInvoice);

module.exports = router;

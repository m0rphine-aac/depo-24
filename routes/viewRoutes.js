// NPM MODULES
const express = require('express');

// CUSTOM MODULES
const viewController = require('../controller/viewController');

const router = express.Router();

router.route('/').get(viewController.getInvoiceList);

module.exports = router;

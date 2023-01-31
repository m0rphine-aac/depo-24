// CORE MODULES
const fs = require('fs');

// NODE MODULES
const easyinvoice = require('easyinvoice');

// CUSTOM MODULES
const Product = require('../models/productModel');
const Invoice = require('../models/invoiceModel');
const catchAsync = require('../utils/catchAsync');

module.exports.createInvoice = catchAsync(async (req, res, next) => {
  // Save Invoice in DB
  const newDocument = await Invoice.create(req.body);

  // Send response
  res.status(201).json({
    status: 'success',
    data: {
      invoice: newDocument,
    },
  });
});

module.exports.getInvoice = catchAsync(async (req, res, next) => {
  const invoice = await Invoice.findById(req.params.id);

  const products = invoice.products.map(product => {
    return {
      quantity: product.qty,
      description: product.sln,
      'tax-rate': product.gstSlab,
      price: product.mrp,
    };
  });

  //Create your invoice! Easy!
  const result = await easyinvoice.createInvoice(generatePDFData(products));
  fs.writeFileSync(
    `${__dirname}/../dev-data/invoices/pdf/invoice-${Date.now()}.pdf`,
    result.pdf,
    'base64'
  );

  res.status(200).json({
    status: 'success',
    data: {
      invoice,
    },
  });
});

const generatePDFData = products => {
  return {
    // Customize enables you to provide your own templates
    // Please review the documentation for instructions and examples
    customize: {
      //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html
    },
    images: {
      // The logo on top of your invoice
      logo: 'https://cdn.shopify.com/s/files/1/0566/3182/0333/files/LOGO-color.png',
      // The invoice background
      // background: 'https://public.easyinvoice.cloud/img/watermark-draft.jpg',
    },
    // Your own data
    sender: {
      company: 'Depo Solutions Private Limited',
      address:
        '77/1/A, Christopher Road, Topsia, Kolkata - 700046 West Bengal GSTIN: 19AAJCD1058P1Z4',
      zip: '700046',
      city: 'Kolkata',
      country: 'India',
      //"custom1": "custom value 1",
      //"custom2": "custom value 2",
      //"custom3": "custom value 3"
    },
    // Your recipient
    client: {
      company: 'Depo Solutions Private Limited',
      address:
        '77/1/A, Christopher Road, Topsia, Kolkata - 700046 West Bengal GSTIN: 19AAJCD1058P1Z4',
      zip: '700046',
      city: 'Kolkata',
      country: 'India',
      // "custom1": "custom value 1",
      // "custom2": "custom value 2",
      // "custom3": "custom value 3"
    },
    information: {
      // Invoice number
      number: 'DEPO/KOL/PI/000007',
      // Invoice data
      date: '30/01/2023',
      // Invoice due date
      'due-date': '28/2/2023',
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    products,
    // The message you would like to display on the bottom of your invoice
    'bottom-notice': 'Looking forward for your business',
    // Settings to customize your invoice
    settings: {
      currency: 'INR', // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
      locale: 'en-GB', // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
      'tax-notation': 'gst', // Defaults to 'vat'
      // "margin-top": 25, // Defaults to '25'
      // "margin-right": 25, // Defaults to '25'
      // "margin-left": 25, // Defaults to '25'
      // "margin-bottom": 25, // Defaults to '25'
      // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
      // "height": "1000px", // allowed units: mm, cm, in, px
      // "width": "500px", // allowed units: mm, cm, in, px
      // "orientation": "landscape", // portrait or landscape, defaults to portrait
    },
    // Translate your invoice to your preferred language
    translate: {
      // "invoice": "FACTUUR",  // Default to 'INVOICE'
      // "number": "Nummer", // Defaults to 'Number'
      // "date": "Datum", // Default to 'Date'
      // "due-date": "Verloopdatum", // Defaults to 'Due Date'
      // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
      // "products": "Producten", // Defaults to 'Products'
      // "quantity": "Aantal", // Default to 'Quantity'
      // "price": "Prijs", // Defaults to 'Price'
      // "product-total": "Totaal", // Defaults to 'Total'
      // "total": "Totaal" // Defaults to 'Total'
    },
  };
};

// [
//   {
//     quantity: 2,
//     description: 'Product 1',
//     'tax-rate': 6,
//     price: 33.87,
//   },
// ]

// 'https://cdn.shopify.com/s/files/1/0566/3182/0333/files/LOGO-color.png?v=1647674394'

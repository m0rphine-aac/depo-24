//CORE MOUDLES
const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(`${__dirname}/../public/pdfs/`).map(name => {
  return {
    name: path.basename(name, '.pdf'),
    url: `/pdfs/${name}`,
  };
});

module.exports.getInvoiceList = (req, res) => {
  res.render('index', { files });
};

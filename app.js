// NODE MODULES
const express = require('express');
const morgan = require('morgan');

// CUSTOM MODULES
const invoiceRouter = require('./routes/invoiceRoutes');

const app = express();

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// GLOBAL MIDDLEWARES

// Body parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));

// ROUTES
app.use('/api/v1/invoices', invoiceRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    data: {
      message: `Can't find ${req.originalUrl} on this server!`,
    },
  });
});

// DEFAULT EXPORT
module.exports = app;

// CORE MODULES
const path = require('path');

// NODE MODULES
const express = require('express');
const morgan = require('morgan');

// CUSTOM MODULES
const invoiceRouter = require('./routes/invoiceRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// GLOBAL MIDDLEWARES

// Body parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));

// Serving static files
app.use(express.static('public'));

// ROUTES
app.use('/', viewRouter);

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

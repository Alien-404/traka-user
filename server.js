// require
require('dotenv').config();
const express = require('express');
const app = express();
const { corsHandler, errorHandler } = require('./middleware');
const morgan = require('morgan');
const { scheduleRoutes } = require('./routes');

// middlewares
app.use(express.json());
app.use(corsHandler);

// middleware logs
app.use(morgan('dev'));

// middlewares routes
app.use('/schedule', scheduleRoutes);

// middleware error
app.use(errorHandler);

// listen app
app.listen(process.env.PORT || 8080, () => {
  console.log(`running on http://localhost:${process.env.PORT}`);
});

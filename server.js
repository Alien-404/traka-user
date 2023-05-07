// require
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

// local modules
const { errorHandler, notfoundHandler } = require('./middleware');
const router = require('./routes');
const limiter = require('./config/limiter');
// swagger setup
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');

// environments
const file = fs.readFileSync('./docs.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

// middlewares
app.use(express.json());
app.use(cors());

// middleware logs
app.use(morgan('common'));

// middlewares routes
app.use(limiter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // api docs swagger
app.use(router);

// middleware error
app.use(errorHandler);
app.use(notfoundHandler);

// listen app
app.listen(process.env.PORT || 8080, () => {
  console.log(`running on http://localhost:${process.env.PORT}`);
});

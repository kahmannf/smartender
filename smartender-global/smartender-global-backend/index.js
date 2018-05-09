'use strict';

const express = require('express');

const config = require('./config');
const logger = require('./logger');
const router = require('./routes');

const app = express();

app.use(router);

app.listen(config.general.port, () => {
  logger.log('Server listening on port ' + config.general.port);
})

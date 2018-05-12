'use strict';

const express = require('express');
const bodyparser = require('body-parser');


const config = require('./config');
const logger = require('./logger');
const routes = require('./routes');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

routes.init(io);

app.use(bodyparser.json());

app.use(routes.router);

app.use('/', express.static('static'));

http.listen(config.general.port, () => {
  logger.log('Server listening on port ' + config.general.port);
})

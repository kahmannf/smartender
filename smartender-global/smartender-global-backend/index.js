'use strict';

const express = require('express');
const bodyparser = require('body-parser');


const config = require('./config');
const logger = require('./logger');
const routes = require('./routes');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/test.html', (req, res) => {
  res.sendFile(__dirname + '/static/test.html');
})

routes.init(io);

app.use(bodyparser.json());

app.use(routes.router);

http.listen(config.general.port, () => {
  logger.log('Server listening on port ' + config.general.port);
})

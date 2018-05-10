const config = require('./config');


const log = (message, level) => {
  if(!level || level <= config.general.loglevel) {
    console.log(message);
  }
};

const error = (err, level) => {
  if(!level || level <= config.general.loglevel) {
    console.error(err);
  }
};

module.exports = {
  log,
  error
};
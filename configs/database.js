const mongoose = require('mongoose');
const config = require('./base');
const log4j = require('log4js');

const logger = log4j.getLogger('mongoose');

async function initDBConn() {
  let uri = config.db.uri;
  let options = config.db.options;

  mongoose.connection.on('error', function (err) {
    logger.error(`Failed to connect to ${uri}: ${err}`);
  });

  mongoose.connection.on('disconnected', function () {
    logger.warn(`Disconnected from ${uri}`);
  });

  mongoose.connection.on('connecting', function () {
    logger.info(`Connecting to mongodb ${uri}`);
  });

  mongoose.connection.on('connected', function () {
    logger.info(`Success connect to ${uri}`);
  });

  const conn = await mongoose.connect(uri, options);
  return conn;
}

module.exports = initDBConn;

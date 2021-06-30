const mongoose = require('mongoose');
const config = require('./base')



async function initDBConn() {

  let uri = config.db.uri;
  let options = config.db.options


  mongoose.connection.on('error', function (err) {
    console.log(`Failed to connect to ${uri}: ${err}`);
  });

  mongoose.connection.on('disconnected', function () {
    console.log(`Disconnected from ${uri}`);
  });

  mongoose.connection.on('connecting', function () {
    console.log(`Connecting to mongodb ${uri}`);
  });

  mongoose.connection.on('connected', function () {
    console.log(`Success connect to ${uri}`);
  });


  const conn = await mongoose.connect(uri, options)
  return conn
}


module.exports = initDBConn


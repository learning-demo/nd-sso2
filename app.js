if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const config = require('./configs/base');
const router = require('./router')


let server;

const startApp = async function () {
  var app = express();

  var port = process.env.PORT || config.port;
  const isDevelopmentEnv = process.env.NODE_ENV === 'development';

  if (isDevelopmentEnv) {
    app.use(morgan('dev'));
  } else {
    app.use(compression());
  }

  app.use(express.json({ extended: true }))
  app.use(express.urlencoded({ extended: true }))

  var mongoStore = MongoStore.create(config.sessionMongoStoreOptions)
  app.use(session({
    ...config.sessionConfig,
    store: mongoStore
  })
  );

  app.use(router);
  // global exception handler
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({ error: err });
  });

  server = app.listen(port);
  console.log(`> Listening at port: ${port}\n`);

}

startApp();

// global unhandled rejection
process.on("unhandledRejection", function (reason, promise) {
  console.log("Unhandled", reason, promise);
  throw reason;
});

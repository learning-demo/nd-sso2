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
const initDBConn = require('./configs/database')


const startApp = async function () {
  await initDBConn()
  const port = process.env.PORT || config.port;
  const isDevelopmentEnv = process.env.NODE_ENV === 'development';

  // global unhandled rejection
  process.on("unhandledRejection", function (reason, promise) {
    console.log("Unhandled", reason, promise);
    throw reason;
  });

  var app = express();

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
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({ error: err });
  });

  let server = app.listen(port);
  console.log(`> Listening at port: ${port}\n`);

}

startApp();



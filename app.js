if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const log4j = require('log4js')

const config = require('./configs/base');
const router = require('./router');
const { initDBConn } = require('./configs/database');
const initializePassport = require('./configs/passport');
const log4jsConfig = require('./configs/log4js')

log4j.configure(log4jsConfig);

process.on('unhandledRejection', function (reason, promise) {
  log4j.getLogger().error('Get unhandled rejection event', reason, promise)
  // exit
  throw reason;
});

const startApp = async function () {
  const port = process.env.PORT || config.port;
  const logger = log4j.getLogger('app')

  await initDBConn();
  let app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(compression());
  }

  // cookie
  app.use(cookieParser());

  // body parsing
  app.use(express.json({ extended: true }));
  app.use(express.urlencoded({ extended: true }));

  // session
  var mongoStore = MongoStore.create(config.sessionMongoStoreOptions);
  app.use(
    session({
      ...config.sessionConfig,
      store: mongoStore,
    })
  );

  // passport
  app.use(flash());
  await initializePassport();
  app.use(passport.initialize());
  app.use(passport.session());

  // router
  app.use(router);
  app.use(function (err, req, res, next) {
    logger.error(err.stack)
    res.status(500).send({ error: err });
  });
  app.use(function (req, res, next) {
    res.status(404).json({ status: 404, message: "Not Found" });
  });

  let server = app.listen(port);
  logger.info(`> Listening at port: ${port}\n`);
};

startApp();

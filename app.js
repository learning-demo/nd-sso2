const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const passport = require('passport');

const config = require('./configs/base');
const router = require('./router');
const initDBConn = require('./configs/database');
const initializePassport = require('./configs/passport');

// global unhandled rejection
process.on('unhandledRejection', function (reason, promise) {
  console.log('Unhandled', reason, promise);
  throw reason;
});

const startApp = async function () {
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
  }
  const port = process.env.PORT || config.port;
  const isDevelopmentEnv = process.env.NODE_ENV === 'development';

  let dbconn = await initDBConn();
  let app = express();

  if (isDevelopmentEnv) {
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
    console.error(err.stack);
    res.status(500).send({ error: err });
  });

  let server = app.listen(port);
  console.log(`> Listening at port: ${port}\n`);
};

startApp();

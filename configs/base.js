const defaultConfig = {
  port: 8888,
  sessionConfig: {
    name: "SSO-SID",
    secret: 'sso-session-secret',
    saveUninitialized: false,
    resave: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2
    }
  },
  sessionMongoStoreOptions: {
    mongoUrl: 'mongodb://admin:admin@127.0.0.1:27017/ng_sso?authSource=admin',
    touchAfter: 24 * 3600,
    autoRemove: 'interval',
    autoRemoveInterval: 10 // In minutes. Default
  },
  db: {
    uri: 'mongodb://127.0.0.1:27017/ng_sso?authSource=admin',
    options: {
      user: 'admin',
      pass: 'admin',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  },
  requestDefaultConfig: {
    baseURL: "http://localhost:8888",
    timeout: 15 * 1000
    // proxy: ""
  }

}

module.exports = {
  ...defaultConfig
}
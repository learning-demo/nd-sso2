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
    mongoUrl: 'mongodb://admin:admin@10.224.198.39:27017/ng_sso?authSource=admin',
    touchAfter: 24 * 3600,
    autoRemove: 'interval',
    autoRemoveInterval: 10 // In minutes. Default
  }

}

module.exports = {
  ...defaultConfig
}
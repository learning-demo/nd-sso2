const mongoose = require('mongoose');
const log4j = require('log4js');
const config = require('./base');
const logger = log4j.getLogger('mongoose');

const UserSchema = require('../models/user.model')
const RoleSchema = require('../models/role.model')
const PermissionCodesSchema = require('../models/permissionCode.model')

const UserModel = mongoose.model('User', UserSchema);
const RoleModel = mongoose.model('Role', RoleSchema);
const PermissionCodeModel = mongoose.model('PermissionCode', PermissionCodesSchema);

async function initDBConn() {
  let uri = config.db.uri;
  let options = config.db.options;

  // mongoose.set('debug', true);
  // callback event
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

module.exports = {
  UserModel,
  RoleModel,
  PermissionCodeModel,
  initDBConn
};

const _ = require('lodash')
const { UserModel: User, RoleModel: Role, PermissionCodeModel: PermissionCode, PermissionCodeModel } = require('../configs/database');

async function createUser(userData) {
  const user = new User(userData);
  await user.save();
}

async function getUserByUsernameAndPassword(username, password) {
  const user = await User.findOne({ username });
  if (!user) {
    return null;
  }

  const isAuthenticate = user.authenticate(password);
  if (!isAuthenticate) {
    return null;
  }

  return user;
}

async function getUserByUsername(username) {
  const user = await User.findOne({ username });
  if (!user) {
    return null;
  }
  return user;
}

async function getUserById(id) {
  const user = await User.findById(id).lean();
  if (!user) {
    return null;
  }
  return user;
}

async function getUserPermissionCodeByUserId(id) {
  let result = [];

  const user = await User.findById(id).lean();
  if (!user) {
    return []
  }

  const userRoleIds = _.unionWith((user.roles || []), _.isEqual);
  const roles = await Role.find({ _id: { $in: userRoleIds } }).lean();
  for (role of roles) {
    if (!role) {
      continue;
    }

    const permissionCodeIds = _.unionWith((role.permissionCodes || []), _.isEqual);
    const permissionCodes = await PermissionCode.find({ _id: { $in: permissionCodeIds } }).lean();
    for (permissionCode of permissionCodes) {
      result.push(permissionCode.code)
    }
  }

  result = _.unionWith((result || []), _.isEqual)
  return result;
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserByUsernameAndPassword,
  getUserById,
  getUserPermissionCodeByUserId,
};

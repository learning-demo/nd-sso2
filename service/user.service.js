const _ = require('lodash');
const {
  UserModel: User,
  RoleModel: Role,
  PermissionCodeModel: PermissionCode,
  PermissionCodeModel,
} = require('../configs/database');

async function listUser() {
  const users = await User.find({}, { salt: 0, password: 0 });
  return users;
}

async function createUser(userData) {
  userData.provider = 'LOCAL;';
  const user = new User(userData);
  await user.save();
}

async function deleteUserById(id) {
  const user = await User.findByIdAndDelete(id, { projection: { salt: 0, password: 0 } });
  return user;
}

async function updateUserById(id, userInfo) {
  userInfo.roles = userInfo.roles ? _.uniqBy(userInfo.roles, (id) => id.toString()) : [];
  const user = await User.findByIdAndUpdate(id, userInfo, { new: true, runValidators: true });

  if (userInfo.password) {
    user.password = userInfo.password;
    return await User(user).save();
  }

  return user;
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
  const user = await User.findById(id, { salt: 0, password: 0 }).lean();
  if (!user) {
    return null;
  }
  return user;
}

async function getUserPermissionCodeByUserId(id) {
  let result = [];

  const user = await User.findById(id).lean();
  if (!user) {
    return [];
  }

  const userRoleIds = _.unionWith(user.roles || [], _.isEqual);
  const roles = await Role.find({ _id: { $in: userRoleIds } }).lean();
  for (role of roles) {
    if (!role) {
      continue;
    }

    const permissionCodeIds = _.unionWith(role.permissionCodes || [], _.isEqual);
    const permissionCodes = await PermissionCode.find({ _id: { $in: permissionCodeIds } }).lean();
    for (permissionCode of permissionCodes) {
      result.push(permissionCode.code);
    }
  }

  result = _.unionWith(result || [], _.isEqual);
  return result;
}

module.exports = {
  listUser,
  createUser,
  deleteUserById,
  updateUserById,
  getUserByUsername,
  getUserByUsernameAndPassword,
  getUserById,
  getUserPermissionCodeByUserId,
};

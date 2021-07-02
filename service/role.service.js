const _ = require('lodash');
const { RoleModel: Role } = require('../configs/database');

async function listRoles() {
  const roles = await Role.find();
  return roles;
}

async function getRoleById(id) {
  const role = await Role.findById(id);
  return role;
}

async function createRole(roleData) {
  roleData.permissionCodes = roleData.permissionCodes ? _.uniqBy(roleData.permissionCodes, (id) => id.toString()) : [];
  const role = new Role(roleData);
  await role.save();
}

async function updateRole(id, roleData) {
  roleData.permissionCodes = roleData.permissionCodes ? _.uniqBy(roleData.permissionCodes, (id) => id.toString()) : [];
  const role = await Role.findByIdAndUpdate(id, roleData, { new: true, runValidators: true });
  return role;
}

async function deleteRoleById(id) {
  // TODO: delete roles in all user's role array.
  const role = await Role.findByIdAndDelete(id);
  return role;
}

module.exports = {
  listRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRoleById,
};

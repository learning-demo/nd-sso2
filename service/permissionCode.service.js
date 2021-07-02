const { PermissionCodeModel: PermissionCode, PermissionCodeModel } = require('../configs/database');


async function listPermisionCodes() {
  const permissionCodes = await PermissionCode.find();
  return permissionCodes;
}

async function createPermisionCode(permissionCodeData) {
  const permissionCode = new PermissionCode(permissionCodeData);
  await permissionCode.save();
}

async function updatePermisionCodeById(id, data) {
  const permissionCode = await PermissionCodeModel.findByIdAndUpdate(id, data)
  return permissionCode;
}

async function deletePermisionCodeById(id) {
  const permissionCode = await PermissionCodeModel.findByIdAndDelete(id)
  return permissionCode;
}

module.exports = {
  listPermisionCodes,
  createPermisionCode,
  updatePermisionCodeById,
  deletePermisionCodeById
};

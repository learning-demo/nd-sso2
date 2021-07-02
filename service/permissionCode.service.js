const { PermissionCodeModel: PermissionCode, PermissionCodeModel } = require('../configs/database');

async function createPermisionCode(permissionCodeData) {
  const permissionCode = new PermissionCode(permissionCodeData);
  await permissionCode.save();
}

async function deletePermisionCodeById(id) {
  const permissionCode = await PermissionCodeModel.findByIdAndDelete(id)
  return permissionCode;
}

module.exports = {
  createPermisionCode,
  deletePermisionCodeById
};

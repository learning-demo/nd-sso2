const { PermissionCodeModel: PermissionCode } = require('../configs/database');

async function createPermisionCode(permissionCodeData) {
  const permissionCode = new PermissionCode(permissionCodeData);
  await permissionCode.save();
}

module.exports = {
  createPermisionCode,
};

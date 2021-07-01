const { RoleModel: Role } = require('../configs/database');

async function createRole(roleData) {
  const role = new Role(roleData);
  await role.save();
}

module.exports = {
  createRole,
};

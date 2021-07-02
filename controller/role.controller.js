const roleService = require('../service/role.service');

async function listRole(req, res, next) {
  try {
    const roles = await roleService.listRoles();
    return res.sendResult(roles, 200, null);
  } catch (err) {
    next(err);
  }
}

async function getRoleById(req, res, next) {
  try {
    const roleId = req.params.id;
    if (!roleId) {
      res.sendResult(null, 400, 'ID is required.');
    }
    const role = await roleService.getRoleById(roleId);
    return res.sendResult(role, 200, null);
  } catch (err) {
    next(err);
  }
}

async function createRole(req, res, next) {
  try {
    const roleData = req.body;
    if (!roleData.name) {
      return res.status(400).json({ status: 400, message: 'role name is required.' });
    }
    await roleService.createRole(roleData);
    return res.status(200).json({ status: 200 });
  } catch (err) {
    next(err);
  }
}

async function updateRole(req, res, next) {
  try {
    const roleId = req.params.id;
    const roleData = req.body;
    if (!roleId || !roleData.name) {
      return res.status(400).json({ status: 400, message: 'role id and name are required.' });
    }
    const role = await roleService.updateRole(roleId, roleData);
    return res.sendResult(role, 200, null);
  } catch (err) {
    next(err);
  }
}

async function deleteRoleById(req, res, next) {
  try {
    const roleId = req.params.id;
    if (!roleId) {
      return res.status(400).json({ status: 400, message: 'ID is required.' });
    }
    const role = await roleService.deleteRoleById(roleId);
    return res.sendResult(role, 200, null);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listRole,
  getRoleById,
  createRole,
  updateRole,
  deleteRoleById,
};

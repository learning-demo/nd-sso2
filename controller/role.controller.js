const roleService = require('../service/role.service');

async function createRole(req, res, next) {
  try {
    const roleData = req.body;
    if (!roleData.name) {
      return res.status(400).json({ status: 400, message: 'role name is required.' });
    }
    await roleService.createRole(roleData);
    return res.status(200).json({ status: 200 });
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createRole,
};

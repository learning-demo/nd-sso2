const permissionCodeService = require('../service/permissionCode.service');

async function createPermisionCode(req, res) {
  const permissionCodeData = req.body;
  if (!permissionCodeData.code) {
    return res.status(400).json({ status: 400, message: 'Miss code' });
  }
  await permissionCodeService.createPermisionCode(permissionCodeData);
  return res.status(200).json({ status: 200 });
}

module.exports = {
  createPermisionCode,
};

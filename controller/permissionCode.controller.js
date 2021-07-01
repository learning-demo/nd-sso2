const permissionCodeService = require('../service/permissionCode.service');

async function createPermisionCode(req, res, next) {
  try {
    const permissionCodeData = req.body;
    if (!permissionCodeData.code) {
      return res.status(400).json({ status: 400, message: 'code is required' });
    }
    await permissionCodeService.createPermisionCode(permissionCodeData);
    return res.status(200).json({ status: 200 });
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createPermisionCode,
};

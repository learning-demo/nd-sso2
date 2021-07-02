const path = require('path')
const log4js = require('log4js')
const permissionCodeService = require('../service/permissionCode.service');

const logger = log4js.getLogger(path.basename(__filename))

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

async function deletePermisionCodeById(req, res, next) {
  try {
    const permissionCodeId = req.params.id;
    if (!permissionCodeId) {
      return res.sendResult(null, 400, 'ID is required')
    }
    const permissionCode = await permissionCodeService.deletePermisionCodeById(permissionCodeId);
    return res.sendResult(permissionCode, 200, 'Delete success');
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createPermisionCode,
  deletePermisionCodeById
};

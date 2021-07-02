const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller');
const roleController = require('../controller/role.controller')
const permissionCodeController = require('../controller/permissionCode.controller')

router.route('/api/ping').get((req, res) => {
  return res.json({ ping: 'pong' });
});

router.route('/api/version').get((req, res) => {
  return res.sendResult({ verison: '1.0.0' }, 200, 'success')
});

router.route('/api/users/login').post(userController.login);
router.route('/api/users/logout').get(userController.logout);


router.route('/api/users').post(userController.createUser);


router.route('/api/roles').post(roleController.createRole)


router.route('/api/permissioncodes').post(permissionCodeController.createPermisionCode)
router.route('/api/permissioncodes/:id').delete(permissionCodeController.deletePermisionCodeById)


module.exports = router;

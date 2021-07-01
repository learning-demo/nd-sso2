const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller');
const permissionCodeController = require('../controller/permissionCode.controller')

router.route('/api/ping').get((req, res) => {
  return res.json({ ping: 'pong' });
});

router.route('/api/users/login').post(userController.login);
router.route('/api/users/logout').get(userController.logout);
router.route('/api/users').post(userController.createUser);

router.route('/api/permissioncodes').post(permissionCodeController.createPermisionCode)

module.exports = router;

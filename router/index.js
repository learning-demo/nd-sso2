const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller');
const roleController = require('../controller/role.controller');
const permissionCodeController = require('../controller/permissionCode.controller');

// Authrization middleware
const { isAuthenticate, checkPermissionCodeFn } = require('../utils/authrization')

const isAuthenticateFilter = isAuthenticate()
const adminPermisionFilter = checkPermissionCodeFn('USER_CONTRIBUTRO')


// Router

router.route('/api/ping').get((req, res) => {
  return res.json({ ping: 'pong' });
});

router.route('/api/version').get((req, res) => {
  return res.sendResult({ verison: '1.0.0' }, 200, 'success');
});

router.route('/api/users/login').post(userController.login);
router.route('/api/users/logout').get(userController.logout);
router.route('/api/users/checkPermission').post(userController.checkPermission);

router.route('/api/users').get(userController.listUser);
router.route('/api/users').post(userController.createUser);
router.route('/api/users/:id').get(userController.getUserById);
router.route('/api/users/:id').delete(adminPermisionFilter, userController.deleteUserById);
router.route('/api/users/:id').put(userController.updateUserById);


router.route('/api/roles').get(roleController.listRole);
router.route('/api/roles/:id').get(roleController.getRoleById);
router.route('/api/roles').post(roleController.createRole);
router.route('/api/roles/:id').put(roleController.updateRole);
router.route('/api/roles/:id').delete(roleController.deleteRoleById);

router.route('/api/permissioncodes').get(permissionCodeController.listPermisionCodes);
router.route('/api/permissioncodes').post(permissionCodeController.createPermisionCode);
router.route('/api/permissioncodes/:id').put(permissionCodeController.updatePermisionCodeById);
router.route('/api/permissioncodes/:id').delete(permissionCodeController.deletePermisionCodeById);

module.exports = router;

const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller')

router.route('/api/ping').get((req, res) => {
  return res.json({ ping: 'pong' });
});


router.route('/api/users').post(userController.createUser)


// test
router.route('/login').get((req, res, next) => {
  req.session.loginUser = 'admin';
  return res.json({ ret_code: 0, ret_msg: '登录成功' });
});
// test
router.route('/logout').get((req, res, next) => {
  res.clearCookie('SSO-SID');
  res.redirect('/');
});

module.exports = router;

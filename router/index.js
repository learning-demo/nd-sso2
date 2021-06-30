const express = require('express');
const router = express.Router();

router.route('/').get((req, res, next) => {
  return res.json({ message: 'Welcome!' });
});

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

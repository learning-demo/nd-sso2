const userService = require('../service/user.service')

async function createUser(req, res) {
  const userData = req.body;
  if (!userData.username || !userData.password) {
    return res.json({ status: 'failed', message: 'Invalid user data.' });
  }
  await userService.createUser(userData);
  return res.json({ status: 'success' });
}

module.exports = {
  createUser
}
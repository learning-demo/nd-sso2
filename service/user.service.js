const User = require('../models/user')

async function createUser(userData) {
  const user = new User(userData);
  await user.save();
}


module.exports = {
  createUser
}
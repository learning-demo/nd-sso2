const User = require('../models/user');

async function createUser(userData) {
  const user = new User(userData);
  await user.save();
}

async function getUserByUsernameAndPassword(username, password) {
  const user = await User.findOne({ username });
  if (!user) {
    return null;
  }

  const isAuthenticate = user.authenticate(password);
  if (!isAuthenticate) {
    return null;
  }

  return user;
}

async function getUserByUsername(username) {
  const user = await User.findOne({ username });
  if (!user) {
    return null;
  }
  return user;
}

async function getUserById(id) {
  const user = await User.findById(id).lean();
  if (!user) {
    return null;
  }
  return user;
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserByUsernameAndPassword,
  getUserById,
};

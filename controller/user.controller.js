const userService = require('../service/user.service');
const passport = require('passport');

async function login(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return res.status(500).send({ status: '500', message: err.toString() });
    }
    if (!user) {
      return res.status(401).send({ status: '401', message: info.message });
    }
    req.login(user, function (err) {
      if (err) {
        return res.status(500).send({ status: '500', message: err.toString() });
      }
      return res.status(200).json({ status: '200' });
    });
  })(req, res, next);
}

async function logout(req, res, next) {
  try {
    // res.clearCookie('SSO-SID');
    req.logout();
    return res.status(200).json({ status: '200', message: 'Logout Successfully' });
  } catch (err) {
    next(err);
  }
}

async function listUser(req, res, next) {
  try {
    const users = await userService.listUser();
    return res.sendResult(users, 200, null);
  } catch (err) {
    next(err);
  }
}

async function getUserById(req, res, next) {
  try {
    const userId = req.params.id;
    if (!userId) {
      res.sendResult(null, 400, 'ID is required.');
    }
    const user = await userService.getUserById(userId);
    return res.sendResult(user, 200, null);
  } catch (err) {
    next(err);
  }
}

async function createUser(req, res, next) {
  try {
    const userData = req.body;
    if (!userData.username || !userData.password) {
      return res.status(400).json({ status: '400', message: 'Invalid user data.' });
    }
    await userService.createUser(userData);
    return res.status(201).json({ status: 'success' });
  } catch (err) {
    next(err);
  }
}

async function deleteUserById(req, res, next) {
  try {
    const userId = req.params.id;
    if (!userId) {
      res.sendResult(null, 400, 'ID is required.');
    }
    const user = await userService.deleteUserById(userId);
    return res.sendResult(user, 200, null);
  } catch (err) {
    next(err);
  }
}

async function updateUserById(req, res, next) {
  try {
    const userId = req.params.id;
    const userInfo = req.body;
    if (!userId || !userInfo) {
      res.sendResult(null, 400, 'ID and user info is required.');
    }
    const user = await userService.updateUserById(userId, userInfo);
    return res.sendResult(user, 200, null);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  login,
  logout,
  listUser,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
};

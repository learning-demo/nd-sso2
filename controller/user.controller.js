const passport = require('passport');
const _ = require('lodash')

const userService = require('../service/user.service');
const config = require('../configs/base')

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
      // login success
      return res.sendResult(null, 200)
    });
  })(req, res, next);
}

async function logout(req, res, next) {
  try {
    // req.logout();
    req.session.destroy();
    res.clearCookie('SSO-SID');
    return res.status(200).json({ status: '200', message: 'Logout Successfully' });
  } catch (err) {
    next(err);
  }
}


async function checkPermission(req, res, next) {
  try {
    const permissionCode = req.body.permissionCode;
    if (req.user && _.includes(req.user.permissionCodes, permissionCode)) {
      const responseData = {
        sessionKey: config.sessionConfig.name,
        maxAge: config.sessionConfig.cookie.maxAge,
      }
      return res.sendResult(responseData, 200, "success");
    } else {
      return res.sendResult(null, 400, "failed");
    }
  } catch (err) {
    next(err);
  }
}

async function getCurrentUserDetails(req, res, next) {
  try {
    const user = req.user;
    if (!user){
      res.sendResult(null, 401, 'please login');
    }
    const userDetails = await userService.getUserById(user._id)
    userDetails.permissionCodes = await userService.getUserPermissionCodeByUserId(user._id)
    return res.sendResult(userDetails, 200);
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
  checkPermission,
  getCurrentUserDetails,
  listUser,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
};

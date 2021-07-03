const _ = require('lodash');


function isAuthenticate() {
  return (req, res, next) => {
    if (req.user) {
      next()
    } else {
      res.sendResult(null, 401, "Unauthorized")
    }
  }
}


function checkPermissionCodeFn(permissionCode) {
  return (req, res, next) => {
    if (req.user && _.includes(req.user.permissionCodes, permissionCode)) {
      next();
    } else {
      res.sendResult(null, 403, "Forbidden")
    }
  }
}

module.exports = {
  isAuthenticate,
  checkPermissionCodeFn
}
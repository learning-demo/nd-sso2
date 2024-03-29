const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const _ = require('lodash')

const userService = require('../service/user.service');

async function initLocalStrategy() {
  // Local Strategy
  passport.use(
    new LocalStrategy(async function (username, password, done) {
      try {
        const user = await userService.getUserByUsername(username);
        if (!user) {
          return done(null, false, { message: `The user ${username} does not exist.` });
        }
        if (!user.authenticate(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null, { message: 'test message' });
      }
    })
  );
}

async function initializePassport() {
  await initLocalStrategy();

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await userService.getUserById(id);

      const permissionCodes = await userService.getUserPermissionCodeByUserId(id)
      user.permissionCodes = permissionCodes;
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
}

module.exports = initializePassport;

var Provider = require('../models/Provider.js');
var config = require('getconfig');
var Strategy = require('passport-github').Strategy;

module.exports = new Strategy({
  clientID: config.user.github.key,
  clientSecret: config.user.github.secret,
  passReqToCallback: true
}, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    return Provider.applyToUser(req.user, accessToken, refreshToken, profile, done);
  }

  Provider.findUser(profile, function(err, user, provider) {
    if (err) return done(err);
    if (user) return done(null, user);
    return Provider.createUser(accessToken, refreshToken, profile, done);
  });
});

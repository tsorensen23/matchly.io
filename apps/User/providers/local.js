var Provider = require('../models/Provider.js');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

module.exports = new LocalStrategy({
  passReqToCallback: true
}, function(req, username, password, done) {
  var profile = {
    provider:'local',
    id:username,
    displayName:username
  };

  Provider.findUser(profile, function(err, user, provider) {
    if (err) return done(err);
    if (!user) {
      var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
      return bcrypt.hash(password, salt, void 0, function(err, password) {
        if (err) return done(err);
        Provider.createUser(username, password, profile, done);
      });
    }

    bcrypt.compare(password, provider.tokenSecret, function(err, isMatch) {
      if (err) return done(err);
      if (!isMatch) return done(null, false, { message: 'Invalid password' });
      return done(null, user);
    });
  });
});

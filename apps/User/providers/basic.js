var Provider = require('../models/Provider.js');
var BasicStrategy = require('passport-http').BasicStrategy;
var Authorize;

module.exports = new BasicStrategy({passReqToCallback:true}, function(req, username, password, done) {
  Provider.findUser({
    provider:'local',
    id:username,
    displayName:username
  }, function(err, user, provider) {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Unknown user ' + username });
    compareToken(user, req.ip, password, function(e, boo) {
      if (e) return done(e);
      if (!boo) {
        return done(null, false, { message: 'Invalid IP' });
      }

      done(null, user);
    });
  });
});

module.exports.createToken = function(user, ipaddress, next) {
  ipaddress = new Buffer(ipaddress).toString('base64');
  next(void(0), ipaddress + '_' + user._id + '_' + Date.now());
};

module.exports.fromToken = function(req, next) {
  var auth = req.headers.authorization;
  if (!auth) return next();
  auth = auth.split(/\s + /).pop() || '';
  if (auth === '') return next();
  auth = new Buffer(token, 'base64').toString();
  auth = auth.split(/:/);
  if (auth.length !== 2) return next();
  authorize(req, auth[0], auth[1], next);
};

function authorize(req, username, password, done) {
  Provider.findUser({
    provider:'local',
    id:username,
    displayName:username
  }, function(err, user, provider) {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Unknown user ' + username });
    compareToken(user, req.ip, password, function(e, boo) {
      if (e) return done(e);
      if (!boo) {
        return done(null, false, { message: 'Invalid IP' });
      }

      done(null, user);
    });
  });
}

function compareToken(user, ipaddress, token, next) {
  if (token.length < 3) return next(void 0, false);
  if (token.length > 100) return next(void 0, false);
  token = token.split('_');
  ipaddress = new Buffer(ipaddress).toString('base64');
  if (ipaddress !== token[0]) {
    console.log(ipaddress, '!==', token[0]);
    return next(void 0, false);
  }

  if (user._id.toString() !== token[1]) {
    console.log(this._id, '!==', token[1]);
    return next(void 0, false);
  }

  if (Date.now() - 60 * 60 * 1000 > token[2]) {
    console.log(Date.now() - 60 * 60 * 1000, '>', token[2]);
    return next(void 0, false);
  }

  return next(void 0, true);
}

function comparePassword(a, b, cb) {
  bcrypt.compare(a, b, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
}

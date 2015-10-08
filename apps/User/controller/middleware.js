var passport = require('passport');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var UserModel = require('./models/User');

passport.serializeUser(function(user, done) {
  done(void 0, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({_id:id}, function(err,user) {
    if (err) return done(err);
    if (!user) return done();
    done(void 0, user);
  });
});

var config = require('getconfig');

var store = new expressSession.MemoryStore();
var session =  expressSession({
  store: store,
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false
});

module.exports = [
  cookieParser(),
  session,
  passport.initialize(),
  passport.session()
];

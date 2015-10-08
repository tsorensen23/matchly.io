var express = require('express');
var passport = require('passport');
var fs = require('fs');

var reqUtil = require(__core + '/server/util');

var userMiddleware = require('./middleware');
var bodyParser = require('body-parser');

fs.readdirSync(__dirname + '/providers').forEach(function(provider) {
  provider = /\.js/.test(provider) ? provider.substring(0, provider.length - 3) : provider;
  if (!(provider in passport._strategies)) {
    passport.use(provider, require(__dirname + '/providers/' + provider));
  }
});

var app = express.Router();

app.use(userMiddleware);

app.get('/', function(req, res, next) {
  if (!req.user) return next();
  res.status(200).send(req.user.toObject());
});

app.get('/login', function(req, res, next) {
  if (req.user) return next();
  res.sendFile(__dirname + '/login.html');
});

app.get('/loggedin', function(req, res) {
  console.log('req.isAuthenticated()', req.user);
  res.send(req.isAuthenticated() ? req.user : '0');
});

app.get('/logout', function(req, res) {
  console.log('logout');
  req.logout();
  res.redirect(process.env.HTTP_AUTH_HREF + '/login');
});

app.get('/token', function(req, res, next) {
  if (!req.user) return next();
  console.log('getting token');
  passport._strategies.basic.createToken(req.user, req.ip, function(err,token) {
    if (err) return next(err);
    res.send({user:req.user.username,token:token});
  });
});

app.param('authtype', function(req, res, next, authtype) {
  if (authtype in passport._strategies) return next();
  next(new Error('non-existant strategy'));
})
.get('/:authtype/init', function(req, res, next) {
  if (req.isAuthenticated()) {
    return next(new Error('You are already Authenticated'));
  }

  passport.authenticate(req.params.authtype, {
    callbackURL: reqUtil.getUrl(req, 'User') + '/' + req.params.authtype + '/login'
  })(req, res, next);
})

.all('/:authtype/login', bodyParser(), function(req, res, next) {
  if (req.isAuthenticated()) {
    return next(new Error('You are already Authorized'));
  }

  passport.authenticate(req.params.authtype, function(err, user, info) {
    if (err) return next(err);
    if (!user) return res.redirect(process.env.HTTP_AUTH_HREF + '/login');
    user.loggedIn = true;
    req.logIn(user, function(err) {
      if (err) return next(err);
      res.statusCode = 201;
      res.redirect(process.env.HTTP_STATIC_HREF + '/');
    });
  })(req, res, next);
});

module.exports = app;

var db = require('../database/db');
var User = db.User;
var bcrypt = require('bcrypt-nodejs');
var cookieParser = require('cookie-parser');
var Hat = require('hat');

module.exports = {
  cookieCheck: function(req, res) {
    var cookie = req.cookies.matchlycookie;
    User.findOne({matchlycookie: cookie}, function(err, data) {
      res.send(data);
    });
  },

  loginHTML:function(req, res) {
    res.sendFile(__dirname + '/../../index.html');
  },

  authorizationCheck: function(req,res, next) {
    if (!req.cookies) {
      return res.redirect('/login.html');
    }

    if (!req.cookies.matchlycookie) {
      return res.redirect('/login.html');
    }

    var cookie = req.cookies.matchlycookie;
    User.findOne({matchlycookie: cookie}, function(err, data) {
      if (err) {
        return res.send(err);
      } else if (data === null) {
        return res.redirect('/login.html');
      }

      // res.send(data);
      next();
    });
  },

  checkLogin: function(req, res, next) {
    if (!req.body.password) {
      return res.sendStatus(404);
    }

    var hash = req.body.password;
    User.findOne({username: req.body.username}, function(err, data) {
      if (!data) {
        // TODO need to handle this properly
        return res.send('User Wasnt found');
      }

      if (err) {
        return next(err);
      }

      var dbhash = data.password;
      var compare = bcrypt.compareSync(hash, dbhash); // true when using correct password
      if (!compare) {
        return next('compare failed');
      }

      var hatNumber = Hat();
      data.matchlycookie = hatNumber;
      data.save(function(err) {
        if (err) {
          return next(err);
        }

        res.cookie('matchlycookie', hatNumber);
        res.send();
      });
    });
  },

  registerUser: function(req, res) {
    req.body.password = bcrypt.hashSync(req.body.password);
    req.body.matchlycookie = req.cookies.matchlycookie;

    User.create(req.body, function(err, data) {
      if (err) {
        return res.send(err);
      }

      res.send(data);
    });
  },

};

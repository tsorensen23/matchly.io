var db = require('../database/db');
var User = db.User;
var Visitors = db.Visitor;
var bcrypt = require('bcrypt-nodejs');
var cookieParser = require('cookie-parser');
var Hat = require('hat');
var moment = require('moment');
var mongoose = require('mongoose');


module.exports = {
  cookieCheck: function(req, res) {
    var cookie = req.cookies.matchlycookie;
    User.findOne({matchlycookie: cookie}, function(err, data) {
      res.send(data);
    });
  },

  authorizationCheck: function(req,res, next) {
    if (!req.cookies) {
      return res.redirect('/login');
    }

    if (!req.cookies.matchlycookie) {
      return res.redirect('/login');
    }

    var cookie = req.cookies.matchlycookie;
    User.findOne({matchlycookie: cookie}, function(err, data) {
      if (err) {
        return res.send(err);
      }

      if (!data) {
        return next();
      }

      req.user = data;
      next();
    });
  },


  deleteVisitors: function(req, res, next) {
    var startDate = moment.utc(req.body.date).subtract(1, 'minute').toDate();
    var endDate = moment.utc(req.body.date).add(1, 'minute').toDate();
    // var date = new Date("2015-11-30T08:00:00.000Z");
    db.Host.find({}, function(err, data) {
      if(err) {
        next(err);
      }
      data.forEach(function(host) {
        if( host.MatchInfo.matches.length ) {
          host.MatchInfo.matches = host.MatchInfo.matches.filter(match =>
              !(Date.parse( match.date ) > startDate && Date.parse( match.date ) < endDate)
              );
          host.save();
        }
      });
    Visitors.find({'MatchInfo.visitDate': { $lte: endDate, $gte: startDate}}).remove(function(err, data){
      mongoose.model('donematches').find({date: { $lte: endDate, $gte: startDate}}).remove(function(err, data){
        res.json(data);
      })
    });
    })
  },
  logout: function(req, res, next) {
    res.cookie('matchlycookie', '');
    res.redirect('/');
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
    if(req.body.schoolCode === "$~P4hH*4:!?SnpBx") { 
      req.body.password = bcrypt.hashSync(req.body.password);
      req.body.matchlycookie = req.cookies.matchlycookie;

      User.create(req.body, function(err, data) {
        if (err) {
          return res.send(err);
        }

        res.send(data);
      });
    } else {
      res.status(422)
      res.send('That registration Code is incorrect')
    }
  },

};

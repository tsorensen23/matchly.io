var UserProfile = require('../database/userModel.js');
var VisitorProfile = require('../database/visitorModel.js');
var HostProfile = require('../database/hostModel.js');
var bcrypt = require('bcrypt-nodejs');
var cookieParser = require('cookie-parser');
var availabilityProfile = require('../database/availability.js');
var Promise = require("bluebird");
var Rumble = require('./../../matchingAlgorithm/algorithm3.js');
var csv=require('fast-csv');
var Hat = require('hat');

module.exports = {
  cookieCheck: function(req,res) {
    var cookie = req.cookies.matchlycookie;
    UserProfile.findOne({'matchlycookie': cookie}, function(err, data) {
        res.send(data);
    });
  },
  getAvailableData:function(req, res) {
    availabilityProfile.find({},function(err, data){
      if(err) {
        res.send(err);
      }
      res.send(data);
    });
  },

  loginHTML:function(req,res) {
    res.sendFile(__dirname + '/../../index.html');
  },

  authorizationCheck: function(req,res,next) {
    if(!req.cookies) {
      return res.redirect('/login.html');
    }

    if(!req.cookies.matchlycookie) {
      return res.redirect('/login.html');
    }

    var cookie=req.cookies.matchlycookie;
    UserProfile.findOne({'matchlycookie': cookie}, function(err, data) {
        if(err){
          return res.send(err);
        }
        else if(data===null) {
         return res.redirect('/login.html');
        }
        // res.send(data);
        next();
    });
  },

  checkLogin: function(req, res, next) {
    if(!req.body.password){
      return res.sendStatus(404);
    } 
    var hash = req.body.password;
    UserProfile.findOne({username: req.body.username}, function(err, data) {
      if(!data){
        // TODO need to handle this properly
        return res.send('User Wasnt found')
      }
      if(err) {
        return next(err);
      }
      var dbhash = data.password;
      var compare = bcrypt.compareSync(hash, dbhash); // true when using correct password
      if(!compare) {
        return next('compare failed');
      }
      var hatNumber = Hat();
      data.matchlycookie=hatNumber;
      data.save(function(err){
        if(err) {
          return next(err);
        }
        console.log('hat number',hatNumber);
        res.cookie('matchlycookie',hatNumber);
        res.send();
      });
    });
  },

  rumble:function(req,res) {
    var VisitorData;
    var HostData;
    var AvailabiltyConstraint;
    VisitorProfile.find({},function(err, data){
      if(err) {
        return res.send(err);
      }
      VisitorData=data;
      HostProfile.find({},function(err, data){
        if(err) {
          return res.send(err);
        }
        HostData=data;
        availabilityProfile.findOne({}).lean().exec(function(err, data){
          if(err) {
            return res.send(err);
          }
          AvailabiltyConstraint=data;
          var RumbleData;
          try {
            RumbleData = Rumble.rumble(VisitorData,HostData,AvailabiltyConstraint);
          }
          catch(err) {
            return res.send(err);
          }
          var csvStream = csv.writeToString(RumbleData, function(err, data){
            if(err){
              res.send(err);
            }
            var dataObject = {
              csv:data,
              array:RumbleData
            };
            res.send(dataObject);
          });
        });
      });
    });
  },

  availability:function(req,res) {
    availabilityProfile.update(req.body, function(err, data) {
      if(err) {
        return res.send(err);
      }
      res.send(data);
    });
  },

  submithosts: function(req, res,next) {
    //made this a batch upload, have not tested it...
    HostProfile.find({}).remove().exec(function(err, data) {
      if(err) {
        return next(err);
      }
      HostProfile.create(req.body, function(err, data) {
        if(err) {
          return res.send(err);
        }
        res.send(data);
      });
    });
  },

  submitvisitors: function(req,res,next) {
    VisitorProfile.find({}).remove().exec(function (err, data) {
      if(err) {
        return next(err);
      }
          VisitorProfile.create(req.body, function(err, data) {
            if(err) {
              return res.send(err);
            }
          res.send(data);
          });
    });
    //I think this is what was causing the cannot set headers error
    // res.sendStatus(200);
  },
  registerUser: function(req, res) {
    req.body.password = bcrypt.hashSync(req.body.password);
    req.body.matchlycookie = req.cookies.matchlycookie;

    UserProfile.create(req.body, function(err, data) {
      if(err) {
        return res.send(err);
      }
      res.send(data);
    });
  },
};

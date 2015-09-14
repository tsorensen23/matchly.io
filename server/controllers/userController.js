var UserProfile = require('../database/userModel.js');
var VisitorProfile = require('../database/visitorModel.js');
var HostProfile = require('../database/hostModel.js');
var bcrypt = require('bcrypt-nodejs');
var cookieParser = require('cookie-parser');
var availabilityProfile = require('../database/availability.js');
var Promise = require("bluebird");
var Rumble = require('./../../algorithm2.js');
var csv=require('fast-csv');
var Hat = require('hat');

module.exports = {
  cookieCheck: function(req,res) {
    var cookie = req.cookies.matchlycookie;
    UserProfile.findOne({'matchlycookie': cookie}, function(err, data) {
        // console.log(data);
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
    res.sendFile(__dirname + '/../../login.html');
  },

  authorizationCheck: function(req,res,next) {
    // console.log(req);
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
    // console.log(cookie,'matchlycookie');
  },

  checkLogin: function(req, res, next) {
    console.log(req.body)
    var hash = req.body.password;
    UserProfile.findOne({username: req.body.username}, function(err, data) {
      if(err) {
        return next(err);
      }
      // console.log('data', data);
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
        availabilityProfile.find({}).lean().exec(function(err, data){
          if(err) {
            return res.send(err);
          }
          AvailabiltyConstraint=data;
          var RumbleData = Rumble.rumble(VisitorData,HostData,AvailabiltyConstraint);
          var csvStream = csv.writeToString(RumbleData, function(err, data){
            console.log(data);
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
      console.log(data,'data');
      res.send(data);
    });
  },

  submithosts: function(req, res) {
    HostProfile.find({}).remove().exec();
    // console.log(req.body);
    req.body.forEach(function(element){
      HostProfile.create(element, function(err, data) {
        if(err) {
          return res.send(err);
        }
        data = data.toObject();
        res.send(data);
      });
    });
  },

  submitvisitors: function(req,res) {
    VisitorProfile.find({}).remove().exec();
    // console.log(req.body);
    var output = [];
    var visitors = req.body.forEach(function(element){
      return VisitorProfile.create(element, function(err, data) {
        if(err){
          throw new Error(err);
        }
      });
    });
    res.sendStatus(200);
  },
  registerUser: function(req, res) {
    // console.log(req.body, "before has");
    req.body.password = bcrypt.hashSync(req.body.password);
    req.body.matchlycookie = req.cookies.matchlycookie;

    // console.log(req.body,"after hash");
    UserProfile.create(req.body, function(err, data) {
      if(err) {
        return res.send(err);
      }
      res.send(data);
    });
  },
};

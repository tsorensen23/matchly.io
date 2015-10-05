var db = require('../database/db');
var User = db.User;
var Visitor = db.Visitor;
var Host = db.Host;
var bcrypt = require('bcrypt-nodejs');
var cookieParser = require('cookie-parser');
var Availability = db.Availability;
var headers = require('../database/headersModel.js');
var Promise = require("bluebird");
var Rumble = require('./../../matchingAlgorithm/algorithm3.js');
var csv=require('fast-csv');
var Hat = require('hat');

module.exports = {
  cookieCheck: function(req,res) {
    var cookie = req.cookies.matchlycookie;
    User.findOne({'matchlycookie': cookie}, function(err, data) {
        res.send(data);
    });
  },
  getAvailableData:function(req, res) {
    console.log(db);
    Availability.find({},function(err, data){
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
    User.findOne({'matchlycookie': cookie}, function(err, data) {
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
    User.findOne({username: req.body.username}, function(err, data) {
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
    Visitor.find({},function(err, data){
      if(err) {
        return res.send(err);
      }
      VisitorData=data;
      Host.find({},function(err, data){
        if(err) {
          return res.send(err);
        }
        HostData=data;
        Availability.findOne({}).lean().exec(function(err, data){
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
    Availability.update(req.body, function(err, data) {
      if(err) {
        return res.send(err);
      }
      res.send(data);
    });
  },

  submithosts: function(req, res,next) {
    //made this a batch upload, have not tested it...
    Host.find({}).remove().exec(function(err, data) {
      if(err) {
        return next(err);
      }
      Host.create(req.body, function(err, data) {
        if(err) {
          return res.send(err);
        }
        res.send(data);
      });
    });
  },

  submitvisitors: function(req,res,next) {
    Visitor.find({}).remove().exec(function (err, data) {
      if(err) {
        return next(err);
      }
          Visitor.create(req.body, function(err, data) {
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

    User.create(req.body, function(err, data) {
      if(err) {
        return res.send(err);
      }
      res.send(data);
    });
  },
  getHeaderData:function(req,res) {
    // console.log('request body',req.body);
    headers.findOne({School:req.body.School},function(err,data){
      if(err) {
        return res.send(err);
      }
      if(data) {
        return res.send(data);
      } 
        var headersModel = {
        School: req.body.School,
        Military: null,
        Country: null, 
        Citizenship: null,
        Undergrad: null,
        Employer: null,
        Industry: null,
        City: null,
        State: null,
        Gender: null
      };
        headers.create(headersModel,function(err, data){
          if (err) {
            return res.send(err);
          }
          res.send(data);
        });
    });
  },

  updateHeaderOrder:function(req,res) {
    headers.findOneAndUpdate({School:req.body.School}, req.body,function(err,data) {
      if(err) return err;
      res.send(data);
    });
  }
};






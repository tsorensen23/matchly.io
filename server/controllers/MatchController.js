var db = require('../database/db');
var Visitor = db.Visitor;
var Host = db.Host;
var Availability = db.Availability;
var headers = require('../database/headersModel.js');
var Rumble = require('./../../matchingAlgorithm/algorithm3.js');
var csv = require('fast-csv');

module.exports = {

  getAvailableData:function(req, res) {
    Availability.find({}, function(err, data) {
      if (err) {
        res.send(err);
      }

      res.send(data);
    });
  },

  rumble:function(req, res) {
    var VisitorData;
    var HostData;
    var AvailabiltyConstraint;
    Visitor.find({}, function(err, data) {
      if (err) {
        return res.send(err);
      }

      VisitorData = data;
      Host.find({}, function(err, data) {
        if (err) {
          return res.send(err);
        }

        HostData = data;
        Availability.findOne({}).lean().exec(function(err, data) {
          if (err) {
            return res.send(err);
          }

          AvailabiltyConstraint = data;
          var RumbleData;
          try {
            RumbleData = Rumble.rumble(VisitorData, HostData, AvailabiltyConstraint);
          } catch (error) {
            return res.send(error);
          }

          var csvStream = csv.writeToString(RumbleData, function(err, data) {
            if (err) {
              res.send(err);
            }

            var dataObject = {
              csv:data,
              array:RumbleData,
            };
            res.send(dataObject);
          });
        });
      });
    });
  },

  availability:function(req, res) {
    Availability.update(req.body, function(err, data) {
      if (err) {
        return res.send(err);
      }

      res.send(data);
    });
  },

  submithosts: function(req, res, next) {
    //made this a batch upload, have not tested it...
    Host.find({}).remove().exec(function(err, data) {
      if (err) {
        return next(err);
      }

      Host.create(req.body, function(err, data) {
        if (err) {
          return res.send(err);
        }

        res.send(data);
      });
    });
  },

  submitvisitors: function(req,res, next) {
    console.log('visitor', Visitor);
    Visitor.find({}).remove().exec(function(err, data) {
      if (err) {
        return res.send(err);
      }

      Visitor.create(req.body, function(err, data) {
        if (err) {
          return res.send(err);
        }

        res.send(data);
      });
    });

    //I think this is what was causing the cannot set headers error
    // res.sendStatus(200);
  },

  getHeaderData:function(req, res) {
    headers.findOne({School:req.body.School}, function(err, data) {
      if (err) {
        return res.send(err);
      }

      if (data) {
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
        Gender: null,
      };
      headers.create(headersModel, function(err, data) {
        if (err) {
          return res.send(err);
        }

        res.send(data);
      });
    });
  },

  updateHeaderOrder:function(req, res) {
    headers.findOneAndUpdate({School:req.body.School}, req.body, function(err, data) {
      if (err) return err;
      res.send(data);
    });
  },

};

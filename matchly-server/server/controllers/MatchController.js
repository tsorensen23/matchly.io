var db = require('../database/db');
var Visitor = db.Visitor;
var Host = db.Host;
var Availability = db.Availability;
var headers = require('../database/headersModel.js');
var Rumble = require('./../../matchingAlgorithm/algorithm3.js');
var csv = require('fast-csv');
var async = require('async');
var mpath = require('mpath');

module.exports = {

  getAvailableData:function(req, res) {
    Availability.find({}, function(err, data) {
      if (err) {
        res.send(err);
      }

      res.send(data);
    });
  },

  rumble:function(req, res, next) {
    var VisitorData;
    var HostData;
    var AvailabiltyConstraint;
    var date = req.query.date ? new Date(parseInt(req.query.date)) : new Date();

    async.parallel([
      function(next) {
        Host.find({
          'MatchInfo.exceptionDate': {$not: {$all: [date]} }
        }, function(err, data) {
          if (err) {
            return next(err);
          }

          HostData = data;
          next();
        });
      },

      function(next) {
        Visitor.find(
          {'MatchInfo.visitDate': date},
          function(err, data) {
          if (err) {
            return next(err);
          }


          VisitorData = data;
          next();
        });
      },

      function(next) {
        Availability.findOne({}).lean().exec(function(err, data) {
          if (err) {
            return next(err);
          }

          AvailabiltyConstraint = data;
          next();
        });
      }
    ], function(err) {
      if (err) return next(err);
      var RumbleData;
      try {
        RumbleData = Rumble.rumble(
          VisitorData,
          HostData,
          AvailabiltyConstraint,
          date
        );
      } catch (error) {
        return next(error);
      }

      async.parallel([
        async.each.bind(async, VisitorData, function(visitor, n) {
          visitor.save(n);
        }),

        async.each.bind(async, HostData, function(host, n) {
          host.save(n);
        }),

        Availability.update.bind(
          Availability,
          {_id:AvailabiltyConstraint},
          AvailabiltyConstraint
        )
      ], function(err) {
        if (err) {
          return next(err);
        }

        RumbleData = Rumble.visitorHostPairings(RumbleData);
        RumbleData = Rumble.SortReturnObject(RumbleData);
        var dataObject = {
          array:RumbleData
        };
          res.json(dataObject);
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

  submitvisitors: function(req, res, next) {
    req.body = req.body.map(function(visitor) {
      if (/0?8\:?00.*/.test(visitor.MatchInfo['Class Visit Time'])) {
        visitor.MatchInfo.classVisitNumber = 1;
        visitor.MatchInfo['Class Visit Time'] = 800;
      } else if (/10\:?00.*/.test(visitor.MatchInfo['Class Visit Time'])) {
        visitor.MatchInfo.classVisitNumber = 2;
        visitor.MatchInfo['Class Visit Time'] = 1000;
      } else if (/11\:?45.*/.test(visitor.MatchInfo['Class Visit Time'])) {
        visitor.MatchInfo.classVisitNumber = 3;
        visitor.MatchInfo['Class Visit Time'] = 1145;
      }
      visitor.MatchInfo.visitDate = new Date(visitor.MatchInfo.visitDate);
      return visitor;
    });
    

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

  getHeaderData: function(req, res) {
    headers.findOne({ School: req.body.School}, { __v: 0, _id: 0 }, function(err, data) {
      if (err) {
        return res.send(err);
      }

      if (data) {
        delete data._id;
        delete data.__v;
        return res.json(data);
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
      headers.create(headersModel, function(err, data) {
        if (err) {
          return res.send(err);
        }

        res.json(data);
      });
    });
  },

  updateHeaderOrder:function(req, res) {
    headers.findOneAndUpdate({School:req.body.School}, req.body, function(err, data) {
      if (err) return err;
      res.send(data);
    });
  }

};

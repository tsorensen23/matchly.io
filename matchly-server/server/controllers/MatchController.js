var db = require('../database/db');
var Visitor = db.Visitor;
var Host = db.Host;
var Availability = db.Availability;
var headers = require('../database/headersModel.js');
var Rumble = require('./../../matchingAlgorithm/algorithm3.js');
var csv = require('fast-csv');
var School = db.School;
var Alias = db.Alias;
var Employer = db.Employer;
var EmployerAlias = db.EmployerAlias;
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
    req.body = req.body.map(function(visitor){
      var newVis = {};
      newVis.Characteristics = {
        Military: visitor.Military,
        Country: visitor.Country,
        Citizenship: visitor.Citizenship,
        Undergrad: visitor.Undergrad,
        Employer: visitor.Employer,
        Industry: visitor.Industry,
        City: visitor.City,
        State: visitor.State,
        Gender: visitor.Gender
      };
      newVis.Contact = {
        First: visitor.First,
        Last: visitor.Last,
        Email: visitor.Email
      };
      newVis.MatchInfo = {
        'Class Visit Time': visitor['Class Visit Time'],
        Section: visitor.Section
      };
      return newVis;
    })
    var visitors = req.body.map(function(visitor) {
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
    async.map(visitors, function(visitor, done){
      async.waterfall([
          function(cb){

        var employer = visitor.Characteristics.Employer;
        Employer.find({name: employer}, function(err, data) {
          if(err) return cb(err);
            if(data.length > 0) {
              return cb(null, visitor);
            }
            EmployerAlias.find({value: employer}, function(err, data){
              if(err) return cb(err)
                if(data.length === 0) return cb(null, visitor);
                Employer.findById(data[0].employerIDs[0], function(err, data){
                  if(err) return cb(err);
                    visitor.Characteristics.Employer = data.name;
                    return cb(null, visitor);
                });
            });
        });
          },
          function(visitor, cb) {
            var school = visitor.Characteristics.Undergrad;
            School.find({name: visitor.Characteristics.Undergrad}, function(err, data) {
              if(err) return cb(err);
                if(data.length > 0) return cb(null, visitor);
                Alias.findOne({value: school}, function(err, data) {
                  if(err) return cb(err);
                    if(!data) return cb(null, visitor);
                    School.findById(data.schoolId[0], function(err, data){
                      if(err) return cb(err);
                        visitor.Characteristics.Undergrad = data.name;
                        return cb(null, visitor);
                    });
                });
            });
          }
      ],
      function(err, results) {
        if(err) return done(err);
        return done(null, results);
      });
    }, function(err, results) {
      if(err) return next(err);
      Host.create(results, function(err, visitors) {
        if(err) return next(err);
        res.json(visitors);
      });
    });

  },

  submitvisitors: function(req, res, next) {
    req.body = req.body.map(function(visitor){
      var newVis = {};
      newVis.Characteristics = {
        Military: visitor.Military,
        Country: visitor.Country,
        Citizenship: visitor.Citizenship,
        Undergrad: visitor.Undergrad,
        Employer: visitor.Employer,
        Industry: visitor.Industry,
        City: visitor.City,
        State: visitor.State,
        Gender: visitor.Gender
      };
      newVis.Contact = {
        First: visitor.First,
        Last: visitor.Last,
      };
      newVis.MatchInfo = {
        'Class Visit Time': visitor['Class Visit Time'],
        visitDate: visitor.visitDate
      };
      return newVis;
    })
    var visitors = req.body.map(function(visitor) {
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
    async.map(visitors, function(visitor, done){
      async.waterfall([
          function(cb){

        var employer = visitor.Characteristics.Employer;
        Employer.find({name: employer}, function(err, data) {
          if(err) return cb(err);
            if(data.length > 0) {
              return cb(null, visitor)
            }
            EmployerAlias.find({value: employer}, function(err, data){
              if(err) return cb(err)
                if(data.length === 0) return cb(null, visitor);
                Employer.findById(data[0].employerIDs[0], function(err, data){
                  if(err) return cb(err);
                    visitor.Characteristics.Employer = data.name;
                    return cb(null, visitor);
                });
            });
        });
          },
          function(visitor, cb) {
            var school = visitor.Characteristics.Undergrad;
            School.find({name: visitor.Characteristics.Undergrad}, function(err, data) {
              if(err) return cb(err);
                if(data.length > 0) return cb(null, visitor);
                Alias.findOne({value: school}, function(err, data) {
                  if(err) return cb(err);
                    if(!data) return cb(null, visitor);
                    School.findById(data.schoolId[0], function(err, data){
                      if(err) return cb(err);
                        visitor.Characteristics.Undergrad = data.name;
                        return cb(null, visitor);
                    });
                });
            });
          }
      ],
      function(err, results) {
        if(err) return done(err);
        return done(null, results);
      });
    }, function(err, results) {
      if(err) next(err);
      Visitor.create(results, function(err, visitors) {
        res.json(visitors);
      });
    });

  },
  getHeaderData: function(req, res) {
    var start = new Date();
    headers.findOne({ School: req.body.School}, { __v: 0, _id: 0, School: 0 }, function(err, data) {
      if (err) {
        return res.send(err);
      }

      if (data) {
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
          res.StatusCode(400);
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

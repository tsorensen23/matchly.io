var db = require('../database/db');
var mongoose = require('mongoose');
var Visitor = db.Visitor;
var Host = db.Host;
var Availability = db.Availability;
var headers = require('../database/headersModel.js');
var Rumble = require('./../../matchingAlgorithm/algorithm3.js');
var School = db.School;
var moment = require('moment');
var _ = require('lodash');
var Alias = db.Alias;
var Employer = db.Employer;
var EmployerAlias = db.EmployerAlias;
var async = require('async');
var mpath = require('mpath');
var availabilityCheck = require('./../../matchingAlgorithm/availabilityCheck.js');

module.exports = {
  getVisitorsByDate: function(req, res, next){
    var startDate = moment.utc(req.query.date).subtract(1, 'minute').toDate();
    var endDate = moment.utc(req.query.date).add(1, 'minute').toDate();
    // var date = new Date("2015-11-30T08:00:00.000Z");
    Visitor.find({ 'MatchInfo.visitDate': { $lte: endDate, $gte: startDate}}, {__v: 0}, function(err, data){
      res.json(data);
    });

  },

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
      var availability = availabilityCheck.availabilityCheck(VisitorData, AvailabiltyConstraint);
      // console.log('just before availabilityCheck');
      if(!availability.status){
        var err = new Error('not enough spots');
        res.status(400).json(availability);
        return next(err, availability);
      }

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
        var schmuck = RumbleData.map((data) => {
          return {
            visitor: data.visitor._id,
            matchedOn: data.matchedOn,
            count: data.count,
            host: data.host._id
          }

        })
        RumbleData = Rumble.visitorHostPairings(RumbleData);
        RumbleData = Rumble.SortReturnObject(RumbleData);
        var dataObject = {
          array:RumbleData
        };
        mongoose.model('donematches').findOne({date: date }, function(err, data){
          if(err) throw err;
          if(!data){
            mongoose.model('donematches').create({date: date, data: schmuck}, function(err, data){
              if(err){
               console.log(err);
               throw err;
              }
              res.json(dataObject);
            })
          } else {
          data.data = schmuck;
          data.save();
          res.json(dataObject);
          }
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
      visitor.MatchInfo.visitDate = moment.utc(visitor.MatchInfo.visitDate).toDate();
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
    var hasClassVisitNums = req.body.every(function(visitor){
      return visitor.hasOwnProperty('classVisitNumber')
    });
    var visitors = req.body.map(function(visitor){
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
      if(hasClassVisitNums){
        newVis.MatchInfo.classVisitNumber = visitor.classVisitNumber;
      }
      return newVis;
    });
    if(!hasClassVisitNums) {
      // map through visit times and set to visitTimes array
      var visitTimes = visitors.map(function(visitor) {
        return visitor.MatchInfo['Class Visit Time'];
      });
      // pull out only unique visit times of all uploaded times
      // sanitize the times with moment.js
      visitTimes = _.map(visitTimes, function(el) {
        return moment(el, 'HH:mm:ss A').toObject();
      });
      // map through visitTimes and sort them from smallest to largest
      visitTimes = visitTimes.sort(function (a, b) {
        if (a.hours > b.hours) {
          return 1;
        }
        if (a.hours < b.hours) {
          return -1;
        }
        return 0;
      });
      visitTimes = visitTimes.map(function (el,i) {
        if (el.hours < 10) {
          el = '0' + el.hours;
        } else {
          el = el.hours + '';
        }
        return el;
      });
      // go through our unique array and given times to place into visiting time slot

      visitTimes = _.uniq(visitTimes);
      // this case handles if there is no 8am and the first visit time needs to be 9am
      if (visitTimes[0] < 9 && visitTimes[0] != 8) {
        visitTimes.unshift('0');
      }
      // this case handles if there is only 8am and 10am but no 11am and adds one index/value to the visitTimes array
      if (visitTimes[1] === 10) {
        visitTimes.push(3);
      }
      // this is for the special case of 9am && 11:45am to have them be an array with length 2
      if (visitTimes[0] < 9 && visitTimes[1] >= 11) {
        visitTimes = [visitTimes[0], 'hiJenna', visitTimes[1]];
      }
      visitors = visitors.map(function(visitor, i) {
        visitor.MatchInfo.classVisitNumber =
          (visitor.MatchInfo['Class Visit Time'].substr(0,1) < 1 || visitor.MatchInfo['Class Visit Time'].substr(0,1) > 1) ? 1 : visitTimes.indexOf(visitor.MatchInfo['Class Visit Time'].substr(0,2)) + 1;
        visitor.MatchInfo.visitDate = new Date(Date.parse(visitor.MatchInfo.visitDate)).getTime();
        return visitor;
      });
  //Class visit time catch
  var proceed=true;
  var JSONerrObject ={visitors:[]};

  visitors.forEach(function(visitor){
    if(typeof visitor.MatchInfo.classVisitNumber === 'undefined'
       || visitor.MatchInfo.classVisitNumber == '0'
       || visitor.MatchInfo.classVisitNumber == ''){
      proceed=false;
      JSONerrObject.visitors.push(visitor);
    }
  });

  //we should only proceed past this if there are no visitors with undefined class visit numbers.
  if(!proceed) return res.status(404).send(JSONerrObject);
}
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
              console.log(data);
                Employer.findById(data[0].employerIDs[0], function(err, data){
                  if(err) return cb(err);
                  if(data) {
                    visitor.Characteristics.Employer = data.name;
                  }
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
                      if(data){
                        visitor.Characteristics.Undergrad = data.name;
                      }
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
        async.map(results, function(visitor, cb){
          Visitor.create(visitor, cb);
        }, function(err, results, three){
          if(err){
            return res.status(401).send(err);
          }else {
          return res.json(results);
          }
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

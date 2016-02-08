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
var visitorControllerHelpers = require('./visitorControllerHelpers.js');


exports.getVisitorsByDate = function(req, res, next){
  var startDate = moment.utc(req.query.date).startOf('day').toDate();
  var endDate = moment.utc(req.query.date).endOf('day').toDate();
  // var date = new Date("2015-11-30T08:00:00.000Z");
  Visitor.find({ 'MatchInfo.visitDate': { $lte: endDate, $gte: startDate}}, {__v: 0}, function(err, data){
    res.json(data);
  });

};
exports.submitvisitors = function(req, res, next) {
  var hasClassVisitNums = req.body.visitors.every(function(visitor){
    return visitor.hasOwnProperty('classVisitNumber')
  });
  var visitors = req.body.visitors.map(function(visitor){
    return visitorControllerHelpers.newVisitors(visitor, hasClassVisitNums)
  });
  if(!hasClassVisitNums) {
    var visitTimes = visitorControllerHelpers.visitTimes(visitors, req.body.twoSlot)
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
              Employer.findById(data[0].employerIDs[0], function(err, data){
                if(err) return cb(err);
                if(data) {
                  visitor.Characteristics.Employer = data.name;
                } else {
                  visitor.Characteristics.Employer = '';
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
                } else {
                  visitor.Characteristics.Undergrad = '';
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

}

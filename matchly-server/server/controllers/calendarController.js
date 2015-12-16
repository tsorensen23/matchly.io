'use strict';
var db = require('../database/db');
var Visitor = db.Visitor;
var Host = db.Host;
var _ = require('lodash');
var moment = require('moment');
var async = require('async');
var buildCalendar = require('./buildCalendar');

module.exports = {
  checkVisitors: function(startDate, endDate){
    return Visitor.find({ 'MatchInfo.visitDate': { $lte: endDate, $gte: startDate}}, { 'MatchInfo.visitDate': 1, _id: 0}).exec()
  },
  getDates: function(req, res, next){
    let startDate = moment.utc(req.query.startDate).subtract(1, 'minute').toDate();
    let endDate = moment.utc(req.query.endDate).add(1, 'minute').toDate();
    // search db for visitors
    async.parallel([function(cb){
      Visitor.find({ 'MatchInfo.visitDate': { $lte: endDate, $gte: startDate}}, { 'MatchInfo.visitDate': 1, _id: 0}, function(err, data) {
        console.log(data);
        if(err) { cb(err); }
        var visitorDays = data.map(d =>
            moment.utc(d.MatchInfo.visitDate).format('YYYY-MM-DD')
            );
        visitorDays = _.uniq(visitorDays, function(date) {
          return date;
        });
        cb(null, visitorDays);
      });
    },
    function(cb){
      Host.find({ 'MatchInfo.matches.date': { $lte: endDate, $gte: startDate}}, { 'MatchInfo.matches.date': 1, _id: 0}, function(err, data) {
        if(err){ return cb(err); }
        var matchedDays = data.map(datapoint =>
            datapoint.MatchInfo.matches.map(match =>
              moment.utc(match.date).format('YYYY-MM-DD')
              )

            );
        matchedDays = _.flatten(matchedDays)
          matchedDays = _.uniq(matchedDays, function(date) {
            return date;
          });
        cb(null, matchedDays);
      });
    }
    ], function(err, results){
      if(err) { return next(err); }
      let visitorDays = results[0],
        matchedDays = results[1];
      var arr = buildCalendar(visitorDays, matchedDays, startDate, endDate);
      res.json(arr);
    });
  }
}

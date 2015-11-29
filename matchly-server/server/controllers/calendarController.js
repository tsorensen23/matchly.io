'use strict';
var db = require('../database/db');
var Visitor = db.Visitor;
var Host = db.Host;
var _ = require('lodash');
var moment = require('moment');
var async = require('async');

module.exports.getDates = function(req, res, next){
  let startDate = new Date(req.query.startDate);
  let endDate = new Date(req.query.endDate);
  // search db for visitors
  async.parallel([function(cb){
      Visitor.find({ 'MatchInfo.visitDate': { $lte: endDate, $gte: startDate}}, { 'MatchInfo.visitDate': 1, _id: 0}, function(err, data) {
        if(err) { cb(err); }
        var visitorDays = data.map(d =>
            moment(d.MatchInfo.visitDate).format('YYYY-MM-DD')
            );
        visitorDays = _.uniq(visitorDays, function(date) {
          return date;
        });
        cb(null, visitorDays);
      });
    },
    function(cb){
      Host.find({ 'MatchInfo.visitDate': { $lte: endDate, $gte: startDate}}, { 'MatchInfo.visitDate': 1, _id: 0}, function(err, data) {
        if(err){ return cb(err); }
        var matchedDays = data.map(d =>
            moment(d.MatchInfo.visitDate).format('YYYY-MM-DD')
            );
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
    var arr = [];
    arr.push({ date: moment(startDate).clone().subtract(1, 'days').format('YYYY-MM-DD'), matched: false, uploaded: false});
    while(moment(arr[arr.length - 1].date) < moment(endDate)) {
      var newDate = moment(arr[arr.length - 1].date).clone().add(1, 'days');
      var visitorIndex = visitorDays.indexOf(newDate.format('YYYY-MM-DD'));
      var matchedIndex = matchedDays.indexOf(newDate.format('YYYY-MM-DD'));
      if(visitorIndex !== -1) {
        arr.push({
          date: visitorDays[visitorIndex],
          uploaded: true,
          matched: false
        });
      } else if( matchedIndex !== -1) {
        arr.push({
          date: matchedDays[matchedIndex],
          uploaded: false,
          matched: true
        });
      }else {
        arr.push({
          date: moment(arr[arr.length - 1].date).clone().add(1, 'days').format('YYYY-MM-DD'),
          matched: false,
          uploaded: false
        });
      }
    }
    arr.shift();
    res.json(arr);
  });
};
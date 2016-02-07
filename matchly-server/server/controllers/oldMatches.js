'use strict';
var mongoose = require('mongoose');
var moment = require('moment');
class OldMatches {
  get(req, res, next){
    if(!req.query.date){
      return res.send('please send a date to find matches for')
    }
    var startDate = moment(req.query.date).startOf('day').toDate();
    var endDate = moment(req.query.date).endOf('day').toDate();
    // find the donematch for the specific day
    //
    // map through the data
    //
    // find the visitor
    // find the host
    // return the new array

    mongoose.model('donematches')
      .findOne({date: {$gte: startDate, $lte: endDate}})
      .lean()
      .exec()
      .then(function(donematches){
        return Promise.all(donematches.data.map(donematch => {
          return Promise.all([
                  mongoose.model('visitors')
                    .findOne({_id: donematch.visitor}, {_id: 0, Contact: 1, MatchInfo: 1})
                    .lean()
                    .exec(),
                  mongoose.model('hosts')
                    .findOne({_id: donematch.host}, {_id: 0, 'Contact': 1,'MatchInfo.Section': 1})
                    .lean()
                    .exec()
                    ]).then(stuff => {
            donematch.visitor = stuff[0];
            donematch.host = stuff[1];

            return donematch
          })
        }))
    })
    .then(done => {
      res.json({data: done})
    })

  }


}
module.exports = new OldMatches()

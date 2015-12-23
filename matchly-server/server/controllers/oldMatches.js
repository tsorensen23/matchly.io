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
    mongoose.model('donematches').findOne({date: {$gte: startDate, $lte: endDate}}, function(err, data){
      if(err) return res.send(err);
      res.json(data);
    })

  }


}
module.exports = new OldMatches()

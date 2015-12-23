var mongoose = require('mongoose');
var db = require('../connection');
var Schema = mongoose.Schema;
var Match = require('./Match');

var MatchSchema = new Schema({
  count:{type:Number},
  score:{type:Number},
  matchedOn:{type:Object},
  visitor:{type:mongoose.Schema.Types.ObjectId},
  host:{type:mongoose.Schema.Types.ObjectId},
  constraintKey:{type:String},
  date:{type:Date}
})
var DoneMatchesSchema = new Schema({
  date: {
    type: Date,
    unique: true
  },
  data: [MatchSchema]
});
module.exports = db.model('donematches', DoneMatchesSchema);


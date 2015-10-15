var Match = require('./../../../matchingAlgorithm/Match.js');
var Schema = require('mongoose').Schema;
var db = require('../connection');

var hostSchema = new Schema({
  Characteristics: {
    Military: {type: String},
    Country: {type: String},
    Citizenship: {type: String},
    Undergrad: {type: String},
    Employer: {type: String},
    Industry: {type: String},
    City: {type: String},
    State: {type: String},
    Gender: {type: String}
  },
  Contact: {
    First: {type: String},
    Last: {type: String},
    Email: {type: String}
  },
  MatchInfo: {
    matchesDone:{
      type:Number,
      default:0
    },
    Section: {type: String},
    exceptionDate: [{type:Date}],
    matches: [{
      date:Date,
      visitor:{
        type: Schema.Types.ObjectId,
        ref: 'visitorProfile'
      }
    }]
  },
  schoolCode: {type: Schema.Types.ObjectId, ref: 'School'}
});
var virtual = hostSchema.virtual('match');

virtual.get(function() {
  return this.MATCH;
});

virtual.set(function(a) {
  this.MATCH = a;
});

module.exports = db.model('hostProfile', hostSchema);

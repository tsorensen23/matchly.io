var Match = require('./../../../matchingAlgorithm/Match.js');
var Schema = require('mongoose').Schema;
var db = require('../connection');

var hostSchema = new Schema({
  Characteristics: {
    Military: {type: String, required: true },
    Country: {type: String, default: 'United States'},
    Citizenship: {type: String, required: true },
    Undergrad: {type: String, required: true },
    Employer: {type: String, required: true },
    Industry: {type: String, default: 'Business' },
    City: {type: String, required: true },
    State: {type: String, required: true },
    Gender: {type: String, required: true }
  },
  Contact: {
    First: {type: String, required: true },
    Last: {type: String, required: true },
    Email: {type: String, required: true }
  },
  MatchInfo: {
    matchesDone:{
      type:Number,
      default:0
    },
    Section: {type: String, required: true},
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

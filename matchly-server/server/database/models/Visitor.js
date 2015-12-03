var mongoose = require('mongoose');
var Match = require('./../../../matchingAlgorithm/Match.js');
var db = require('./../connection');

var Schema = mongoose.Schema;

var visitorSchema = new Schema({
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
    'Class Visit Time': {type: String},
    classVisitNumber: {type: String},
    visitDate: {type: Date},
    matchHost: {
      type: Schema.Types.ObjectId,
      ref: 'hostProfile',
      required: false
    }
  },
  schoolCode: {type: Schema.Types.ObjectId, ref: 'School'}
});

// var virtual = visitorSchema.virtual('match');
// virtual.get(function(){
//     return this.MATCH;
// });
// virtual.set(function(a){
//     this.MATCH=a;
// });

module.exports = db.model('visitorProfile', visitorSchema);

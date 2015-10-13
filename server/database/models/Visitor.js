var mongoose = require('mongoose');
var Match = require('./../../../matchingAlgorithm/Match.js');
var db = require('./../connection');

var Schema = mongoose.Schema;

var visitorSchema = new Schema({
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
    'Class Visit Time': {type: String},
    classVisitNumber: {type: String},
    visitDate: {type: Date},
    matchHost: {type: Schema.Types.ObjectId, ref: 'hostProfile'}
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

var mongoose = require('mongoose');
var Match = require('./../../../matchingAlgorithm/Match.js');
var db = require('./../connection');

var Schema = mongoose.Schema;

var visitorSchema = new Schema({
  Characteristics: {
    Military: {type: String, default: ' '  },
    Country: {type: String, default: 'United States'},
    Citizenship: {type: String, default: ' '  },
    Undergrad: {type: String, default: ' '  },
    Employer: {type: String, default: ' '  },
    Industry: {type: String, default: 'Business' },
    City: {type: String, default: ' '  },
    State: {type: String, default: ' '  },
    Gender: {type: String, default: ' '  }
  },
  Contact: {
    First: {type: String, required: true },
    Last: {type: String, required: true },
    Email: {type: String}
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

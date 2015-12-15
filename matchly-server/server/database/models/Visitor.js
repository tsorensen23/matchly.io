var mongoose = require('mongoose');
var Match = require('./../../../matchingAlgorithm/Match.js');
var db = require('./../connection');

var Schema = mongoose.Schema;
const STATES= ["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"]


var visitorSchema = new Schema({
  Characteristics: {
    Military: {type: String, default: ' '  },
    Country: {type: String, default: ' '},
    Citizenship: {type: String, default: ' '   },
    Undergrad: {type: String, default: ' '  },
    Employer: {type: String, default: ' '  },
    Industry: {type: String, default: ' ' },
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

visitorSchema.pre('save', function(next) {
  if(STATES.indexOf(this.Characteristics.State) > -1){
    this.Characteristics.Country = 'United States';
  }
  next();
});

// var virtual = visitorSchema.virtual('match');
// virtual.get(function(){
//     return this.MATCH;
// });
// virtual.set(function(a){
//     this.MATCH=a;
// });

module.exports = db.model('visitors', visitorSchema);

var mongoose = require('mongoose');
var Match = require('./../../../matchingAlgorithm/Match.js');
var db = require('./../connection');

var Schema = mongoose.Schema;
const STATES= ["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"]


var visitorSchema = new Schema({
  Characteristics: {
    Military: {type: Schema.Types.String },
    Country: {type: String, default: ' '},
    Citizenship: {type: String, default: ' '   },
    Undergrad: {type: String, default: ' '  },
    Employer: {type: String, default: ' '  },
    Industry: {type: String, default: ' ' },
    City: {type: String, default: ' '  },
    State: {type: String, default: ' '  },
    Gender: {type: String }
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

var genderMap = {
   'Male': 'M',
   'male': 'M',
   'Female': 'F',
   'female': 'F',
   'Woman': 'F',
   'woman': 'F',
   'Womyn': 'F',
   'Man': 'M',
   'man': 'M',
   'M': 'M',
   'm': 'M',
   'F': 'F',
   'f': 'F'
};
visitorSchema.pre('validate', function(next) {
  var newGender = genderMap[this.Characteristics.Gender];
  this.Characteristics.Gender = newGender ? newGender : ' ';
  next();
});

var milMap = {
  'Active Duty Military': 'Veteran',
  'Dependent of Veteran': 'Veteran',
  'Veteran': 'Veteran',
  'Yes': 'Veteran',
  'true': 'Veteran',
  'false': 'None',
  'No': 'None',
  'None': 'None',
  'N/A': 'None',
  'Veteran/Active': 'Veteran',
  ' ': 'None'
};
visitorSchema.pre('validate', function(next) {
  var newMil = milMap[this.Characteristics.Military];
  this.Characteristics.Military = newMil ? newMil : ' ';
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

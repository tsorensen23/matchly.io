var mongoose = require('mongoose');
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
        matchScore: {type: Number},
        matchIndex: {type: String},
        matchedOn: {type: Object},
        matchCount: {type: Number}
    }
  });

module.exports = mongoose.model('visitorProfile', visitorSchema);
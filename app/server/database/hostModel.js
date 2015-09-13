var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
        Email: {type: String},
    },
    MatchInfo: {
        Section: {type: String},
        1: {
            matchIndex:{type: String},
            matchScore:{type: Number}
        },
        2: {
            matchIndex:{type: String},
            matchScore:{type: Number}
        },
        3: {
            matchIndex:{type: String},
            matchScore:{type: Number}
        } 
    }
  });

module.exports = mongoose.model('hostProfile', hostSchema);
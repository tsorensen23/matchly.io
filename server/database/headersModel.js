var Match = require('./../../matchingAlgorithm/Match.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var headersSchema = new Schema({
        School: {type:String},
        Military: {type: String},
        Country: {type: String}, 
        Citizenship: {type: String},
        Undergrad: {type: String},
        Employer: {type: String},
        Industry: {type: String},
        City: {type: String},
        State: {type: String},
        Gender: {type: String}
  });

module.exports = mongoose.model('headersSchema', headersSchema);
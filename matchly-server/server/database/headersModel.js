var Match = require('./../../matchingAlgorithm/Match.js');
var mongoose = require('mongoose');
var DB = require('./connection.js');
var Schema = mongoose.Schema;

var headersSchema = new Schema({
  School: {type:String, default: ''},
        Military: {type: String, default: ''},
        Country: {type: String, default: ''}, 
        Citizenship: {type: String, default: ''},
        Undergrad: {type: String, default: ''},
        Employer: {type: String, default: ''},
        Industry: {type: String, default: ''},
        City: {type: String, default: ''},
        State: {type: String, default: ''},
        Gender: {type: String, default: ''},
        First: {type: String, default: ''},
        Last: {type: String, default: ''},
        'Class Visit Time':{type: String, default: ''}
  });

module.exports = DB.model('headersSchema', headersSchema);

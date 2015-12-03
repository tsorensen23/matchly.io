var Schema = require('mongoose').Schema;
var db = require('../connection');

var EmployerAliasSchema = new Schema({
  value: { type: String },
  employerIDs: { type: [Schema.ObjectId], ref: 'employer' }
});

module.exports = db.model('employeraliases', EmployerAliasSchema);

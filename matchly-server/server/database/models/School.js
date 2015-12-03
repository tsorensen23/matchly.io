var Schema = require('mongoose').Schema;
var db = require('../connection');
var Hat = require('hat');

var SchoolSchema = new Schema({
  name: { type: String, unique: true },
  registrationId: { type: String, required: true, default: Hat}
});

var School = db.model('schools', SchoolSchema);

module.exports = School;

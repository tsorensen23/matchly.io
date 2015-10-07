var Schema = require('mongoose').Schema;
var db = require('../connection');

var SchoolSchema = new Schema({
  name: { type: String }
});

var School = db.model('School', SchoolSchema);

module.exports = School;

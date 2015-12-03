var Schema = require('mongoose').Schema;
var db = require('../connection');

var IndustrySchema = new Schema({
  name: {type: String, unique: true}
});

module.exports = db.model('industries', IndustrySchema);

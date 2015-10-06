var Schema = require('mongoose').Schema;
var db = require('../connection');

var AliasSchema = new Schema({
  Value: { type: String },
  schoolId: { type: [Schema.ObjectId] }
});

var Alias = db.model('Alias', AliasSchema);

module.exports = Alias;

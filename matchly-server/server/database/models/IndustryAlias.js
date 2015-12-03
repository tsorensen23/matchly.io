var Schema = require('mongoose').Schema;
var db = require('../connection');

var AliasSchema = new Schema({
  value: { type: String },
  industryIDs: { type: [Schema.ObjectId] }
});

module.exports = db.model('industryaliases', AliasSchema);

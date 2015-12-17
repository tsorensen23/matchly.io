var Schema = require('mongoose').Schema;
var db = require('../connection');

var AliasSchema = new Schema({
  value: { type: String, unique: true },
  schoolId: { type: [Schema.ObjectId] }
});

AliasSchema.pre('save', function(next) {
  var obj = {};
  this.schoolId.forEach(function(id) {
    if (!(id in obj)) obj[id] = true;
  });

  this.schoolId = Object.keys(obj);
  next();
});

var Alias = db.model('aliases', AliasSchema);

module.exports = Alias;

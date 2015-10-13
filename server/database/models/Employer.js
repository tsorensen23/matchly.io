var Schema = require('mongoose').Schema;
var db = require('../connection');

var EmployerSchema = new Schema({
  name: { type: String, unique: true},
});

module.exports = db.model('employer', EmployerSchema);

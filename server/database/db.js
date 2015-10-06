var User = require('./models/User');
var Visitor = require('./models/Visitor.js');
var Host = require('./models/Host');
var Availability = require('./models/Availability');
var Alias = require('./models/Alias');
var School = require('./models/School');
var db = {};
db.User = User;
db.Visitor = Visitor;
db.Host = Host;
db.School = School;
db.Availability = Availability;
db.Alias = Alias;

module.exports = db;

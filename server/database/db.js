var User = require('./models/User');
var Visitor = require('./models/Visitor');
var Host = require('./models/Host');
var Availability = require('./models/Availability');
var db = {};
db.User = User;
db.Vistor = Visitor;
db.Host = Host;
db.Availability = Availability;

module.exports = db;

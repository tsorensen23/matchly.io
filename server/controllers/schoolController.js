var Fuzzy = require('../database/models/Fuzzy/Synchronous');
var Full = require('../database/models/Fuzzy/Full');

module.exports.checkSchools = function(req, res, next) {
  Full.find({}, function(err,travisLoveList) {
    if (err) return next(err);
    var list = new Fuzzy(travisLoveList);
    var newNames = req.body.names.map(list.getFull.bind(list));
    res.json(newNames);
  });
};

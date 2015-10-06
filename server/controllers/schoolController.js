var Fuzzy = require('../database/models/Fuzzy/Synchronous');
var Full = require('../database/models/Fuzzy/Full');

module.exports.checkSchools = function(req, res, next) {
  Full.find({}, function(err,travisLoveList) {
    if (err) return next(err);
    console.log('travisLoveList',travisLoveList);
    var list = new Fuzzy(travisLoveList.map(function(o) {return o.value;}));

    var newNames = req.body.names.map(list.getFull.bind(list));
    res.json(newNames);
  });
};

module.exports.addAlias = function(req, res, next) {
  var alias = req.post.alias;
  var full = req.post.full;
};

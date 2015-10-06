var Fuzzy = require('../database/models/Fuzzy/Synchronous');
var Full = require('../database/models/Fuzzy/Full');
var Alias = require('../database/models/Fuzzy/Alias');
var async = require('async');

module.exports.checkAlias = function(req, res, next) {
  async.map(req.body.names, function(item, next)  {
    Alias.find({value:item}, function(err, doc) {
      if(err) return next(err);
      if(doc) return next(null, doc);
      next();
    });
  },function(err,mapped) {
    if(err) return next(err);
    res.send(mapped);
  });
  
},

module.exports.checkSchools = function(req, res, next) {
  Full.find({}, function(err,travisLoveList) {
    if (err) return next(err);
    travisLoveList=travisLoveList[0].value.split('\r');

    var list = new Fuzzy(travisLoveList);
    var newNames = req.body.names.map(list.getFull.bind(list));
    res.json(newNames);
  });
};

module.exports.addAlias = function(req, res, next) {
  var alias = req.post.alias;
  var full = req.post.full;
};

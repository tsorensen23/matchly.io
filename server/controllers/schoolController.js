var Fuzzy = require('../database/models/Fuzzy/Synchronous');
var db = require('../database/db');

//var Full = require('../database/models/Fuzzy/Full');
//var Alias = require('../database/models/Fuzzy/Alias');
var async = require('async');
var School = db.School;
var Alias = db.Alias;

module.exports.checkAlias = function(req, res, next) {

  // response will be a JSON object with the string the user wrote, and the mapping that we have, if its null then no watch was found and ask user to input a new school
  var output = {};
  async.each(req.body.names, function(v, next) {
    Alias.find({value: v}, function(err, alias) {
      if (err) {
        return next(err);
      }

      if (alias.length === 0) {
        output[v] = null;
        return next();
      }

      School.find({_id: alias.schoolId}, function(err, school) {
        if (err) {
          return next(err);
        }

        if (school) {
          output[v] = school.name;
        }

        if (!school) {
          output[v] = null;
        }

        next();
      });
    });
  }, function(error) {

    if (error) {
      res.send(error);
    }

    res.json(output);
  });

  //  async.map(req.body.names, function(item, next)  {
  //  Alias.find({value:item}, function(err, doc) {
  //  if(err) return next(err);
  //  if(doc) return next(null, doc);
  //  next();
  //  });
  //  },function(err,mapped) {
  //  if(err) return next(err);
  //  res.send(mapped);
  //  });

};

module.exports.checkSchools = function(req, res, next) {
  Full.find({}, function(err,travisLoveList) {
    if (err) return next(err);
    travisLoveList = travisLoveList[0].value.split('\r');

    var list = new Fuzzy(travisLoveList);
    var newNames = req.body.names.map(list.getFull.bind(list));
    res.json(newNames);
  });
};

module.exports.addAlias = function(req, res, next) {
  var alias = req.post.alias;
  var full = req.post.full;
};

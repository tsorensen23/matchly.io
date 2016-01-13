var Fuzzy = require('../database/models/Fuzzy/Synchronous');
var db = require('../database/db');
var mpath = require('mpath');
var Promise = require('bluebird');

var _ = require('lodash');
//var Full = require('../database/models/Fuzzy/Full');
//var Alias = require('../database/models/Fuzzy/Alias');
var async = require('async');
var School = db.School;
var Alias = db.Alias;

module.exports.checkAlias = function(req, res, next) {

  // response will be a JSON object with the string the user wrote, and the mapping that we have, if its null then no watch was found and ask user to input a new school
  //
  //
  // Find if the name is an alias
  // if (!alias) check if it is a school name
  // if (!schoolName) create a new alias with no school id
  // if (schoolName) create a new alias with that schools id
  // if (alias) return that alias's school name
  //
  
  req.body.names = _.uniq(req.body.names)
  Promise.map(req.body.names, name => {
    return Alias.findOne({value: name}).exec()
        .then(alias => {
          if (!alias) {
            return School.findOne({name: name}).exec()
              .then(school => {
                if (!school) {
                  return Alias.create({value: name})
                }
                return Alias.create({value: name, schoolId: [school]})
              })
          }
          return alias
        }).then(alias => {
          if (alias.schoolId.length) {
            return School.find({_id: {$in: alias.schoolId}}).exec()
              .then(schools => {
                var obj = {}
                var schoolNames = mpath.get('name', schools)
                obj[name] = schoolNames.length > 1 ? schoolNames : schoolNames[0]
                return obj
              })
          }
          var obj = {}
          obj[name] = null
          return obj
        })
  }).then(finished => {
    var output = finished.reduce((prev, curr) => {
      for (var prop in curr) {
        prev[prop] = curr[prop]
      }
      return prev
    }, {})
    res.json(output)
  }).catch(next)
}

module.exports.schoolMatch = function(req, res, next) {

  Alias.findOne({value: req.body.alias})
    .then(alias => {
      if (alias){
        return alias
      }
      return Alias.create({value: req.body.alias})
    }).then(alias => {
      return School.findOne({name: req.body.trueValue}).then(school => {
        if(!school){
          return School.create({name: req.body.trueValue})
        }
        return school
      }).then(school => {
        alias.schoolId.push(school.id);
        return alias.save()
      })
    }).then(alias => {
      console.log(alias);
      return res.json({alias: alias, employerName: req.body.trueValue})
    })
  // obj comes is an { alias: String, schoolname: String }
  // find or create an alias for the alias, and set its schoolId to the id of the schoolname.
};

module.exports.getSchools = function(req, res, next) {
  School.find({}, function(err, data) {
    if (err) return next(err);
    data = data.map(function(school) {
      return school.name;
    });

    res.json(data);
  });
};

module.exports.addAlias = function(req, res, next) {
  var alias = req.post.alias;
  var full = req.post.full;
};

module.exports.middleWare = function(req, res, next) {
  if (true) {
    if (!req.crudExtra) req.crudExtra = {};
    return next();
  }
  req.crudExtra.schoolCode = req.user.schoolCode;
  next();
};

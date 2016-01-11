var Fuzzy = require('../database/models/Fuzzy/Synchronous');
var db = require('../database/db');
var mpath = require('mpath');

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
  Promise.all(req.body.names.map(name => {
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
  })).then(finished => {
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

  // obj comes is an { alias: String, schoolname: String }
  // find or create an alias for the alias, and set its schoolId to the id of the schoolname.
  Alias.findOne({value: req.body.alias}, function(err, alias) {
    if (err) {
      return next(err);
    }

    if (!alias || alias.length === 0) {
      alias = new Alias({value: req.body.alias});
    }

    School.findOne({name: req.body.trueValue}, function(err, school) {
      if (err) {
        return next(err);
      }
      if(school){
        if (alias.schoolId.indexOf(school.id) === -1){
          alias.schoolId.push(school.id);
          alias.save();
          res.json({alias: alias, schoolname: school.name});
        }
      } else {
        School.create({name: req.body.trueValue}, function(err, school){
          if(err){
            return next(err);
          }
          alias.schoolId.push(school.id);
          alias.save();
        res.json({alias: alias, schoolname: school.name});
        })
      }
    });

  });
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

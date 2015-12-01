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
    Alias.findOne({value: v}, function(err, alias) {
      if (err) {
        return next(err);
      }

      if (!alias) {
        output[v] = null;
        return School.findOne({name: v}, function(err, school) {
          if (err) return next(err);
          if (!school) return next();
          output[v] = school.name;
          Alias.create({value: v, schoolId: [school]}, next);
        });
      }

      School.find({_id: {$in: alias.schoolId}}, function(err, schools) {
        if (err) {
          return next(err);
        }

        if (schools.length === 1) {
          output[v] = schools[0].name;
        } else if (schools.length > 1) {
          output[v] = schools.map(function(s) { return s.name; });
        }else if (schools.length === 0) {
          output[v] = null;
        }

        next();
      });
    });
  }, function(error) {

    if (error) {
      return next(error);
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

    var school;
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
    console.log('TODO: implement schoolcodes');
    if (!req.crudExtra) req.crudExtra = {};
    return next();
  }
  req.crudExtra.schoolCode = req.user.schoolCode;
  next();
};

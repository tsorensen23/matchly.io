var EmployerAlias = require('../database/db').EmployerAlias;
var Employer = require('../database/db').Employer;
var async = require('async');
var mpath = require('mpath');
module.exports.checkMatch = function(req, res, next) {
  Promise.all(req.body.employers.map(name => {
    return EmployerAlias.findOne({value: name }).exec()
        .then(alias => {
          if(!alias) {
            return Employer.findOne({name: name}).exec()
              .then(employer => {
                if (!employer){
                  return EmployerAlias.create({value: name})
                }
                return EmployerAlias.create({value: name, employerIDs: [employer]})
              })
          }
          return alias;
        }).then(alias => {
          if(alias.employerIDs.length){
            return Employer.find({_id: {$in: alias.employerIDs}}).exec()
              .then(employers => {
                var obj = {}
                var employerNames = mpath.get('name', employers)
                obj[name] = employerNames.length > 1 ? employerNames : employerNames[0]
                return obj
              })
          }
          var obj = {}
          obj[name] = null
          return obj
        })
  })).then(finished => {
    var output = finished.reduce(function(prev, curr) {
      for(var prop in curr){
        prev[prop] = curr[prop]
      }
      return prev
    }, {})
    res.json(output)

  }).catch(next)

};
module.exports.getEmployers = function(req, res, next) {
  Employer.find({}, function(err, data) {
    if(err) return next(err);
    var output = data.map(function(employer) {
      return employer.name;
    })
    res.json(output);
  });
};
module.exports.createEmployer = function(req, res, next) {
  Employer.create({name: req.body.name }, function(err, data) {
    if(err) return next(err);
    res.json(data);
  });
};
// sample payload
// {"alias":"Nielsen","school":"Nielsen"}
module.exports.employerMatch = function(req, res, next) {
  // find if the alias has  match
  Employer.findOne({name: req.body.trueValue})
    .then(employer => {
      if (employer){
        return employer
      }
      return Employer.create({name: req.body.trueValue})
    }).then(employer => {
      return EmployerAlias.create({value: req.body.alias, employerIDs: [employer.id]})
    }).then(alias => {
      return res.json({alias: alias, employerName: req.body.trueValue})
    })
}

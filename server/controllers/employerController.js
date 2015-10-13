var EmployerAlias = require('../database/db').EmployerAlias;
var Employer = require('../database/db').Employer;
var async = require('async');
module.exports.checkMatch = function(req, res, next) {
  var output = {};
  async.each(req.body.employers, function(v, next) {
    EmployerAlias.findOne({value: v}, function(err, alias) {
      if(err){
       return next(err);
      }
      if (!alias) {
        output[v] = null;
        return Employer.findOne({name: v}, function(err, employer) {
          if (err) return next(err);
          if (!employer) return next();
          output[v] = employer.name;
          EmployerAlias.create({value: v, employerIDs: [employer]}, next);
        });
      }
      Employer.find({_id: {$in: alias.employerIDs}}, function(err, employers) {
        if (err) {
          return next(err);
        }

        if (employers.length === 1) {
          output[v] = employers[0].name;
        } else if (employers.length > 1) {
          output[v] = employers.map(function(s) { return s.name; });
        }else if (employers.length === 0) {
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
  EmployerAlias.findOne({value: req.body.alias}, function(err, alias) {
    if(err) return next(err);
    if(!alias || alias.length === 0 ) {
      alias = new EmployerAlias({value: req.body.alias});
    }
    if(alias) {
      Employer.find({name: req.body.employer}, function(err, employer) {
        if(err) return next(err);
        if(alias.employerIDs.indexOf(employer.id) === -1) {
          alias.employerIDs.push(employer.id);
          alias.save();
          res.json({alias: alias, employerName: employer.name});
        }
      });
    }
  });

}

var db = require('db');
var Industry = db.Industry;
var IndustryAlias = db.IndustryAlias;


module.exports.checkAlias = function(req, res, next) {
  var output = {}
  req.body.aliases.map(function(name) {
    IndustryAlias.find({value: name}, function(err, industryalias) {
      if (industryalias.length !== 0) {
          Industry.find({_id: {$in: industryalias.industryIDs}}, function(industries) {
            output[name] = industries.map(function(thing){ return thing.name;});
          });
        });
      } else {
        output[name] = null;
      }

    });
  });
  res.json(output)
};


module.exports.industryMatch = function(req, res, next) {

};

module.exports.getIndustries = function(req, res, next) {

};

var Fuzzy = require('../database/models/Fuzzy/Synchronous')
module.exports.checkSchools = function(req, res, next) {
  var list = new Fuzzy(req.body.names);
  var output = {
    acronyms: list.acronyms,
    fulls: list.fulls
  };
  res.json(output);
};

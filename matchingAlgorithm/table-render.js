var MATCH_KEYS = require('./matchly-io-keys.js');

module.exports = function(matchArray) {

  var matches = matchArray.map(function(match) {
    return match.toClientObject();
  });

  var headerObject = {

    visitorName:'Visitor',
    hostName:'Host',
    hostEmail:'Host Email',
    section:'Section',
    visitTime:'Lecture',
    matchCount:'Match Count'

    //this loops through the keys and determines what we are matched on
  };

  for (var i = 0; i < MATCH_KEYS.length; i++) {
    headerObject[MATCH_KEYS[i]] = MATCH_KEYS[i].toString();
  }

  matches.unshift(headerObject);
  return matches;
};

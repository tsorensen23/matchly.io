var mongoose = require('mongoose');

function Match(keys, visitor, host) {
  this.count = 0;
  this.score = 0;
  this.matchedOn = {};
  this.keys = keys;
  this.visitor = visitor;
  this.host = host;
  this.constraintKey = host.MatchInfo.Section + visitor.MatchInfo.classVisitNumber;
  this.calculatematchScore();
}

Match.Schema = {
  count:{type:Number},
  score:{type:Number},
  matchedOn:{type:Object},
  visitor:{type:mongoose.Schema.Types.ObjectId},
  host:{type:mongoose.Schema.Types.ObjectId},
  constraintKey:{type:String}
};

Match.prototype.calculatematchScore = function() {
  var MATCH_KEYS = this.keys;
  var visitor = this.visitor;
  var host = this.host;

  for (var i = 0; i < MATCH_KEYS.length; i++) {
    if (visitor.Characteristics[MATCH_KEYS[i]] === host.Characteristics[MATCH_KEYS[i]]) {
      this.score += MATCH_KEYS[i].incrementalScore;
      this.count++;
      this.matchedOn[MATCH_KEYS[i]] = true;
    } else {
      this.matchedOn[MATCH_KEYS[i]] = false;
    }
  }

  return this;
};

Match.prototype.isBetterThan = function(otherMatch) {
  //returning false will skip this match, returning true will say this is your current best
  if (!otherMatch || !otherMatch.host) {
    return true;
  }

  // If host has a match
  // If we're not better, we want to skip it
  if (otherMatch.score > this.score) {
    return false;
  }

  if (otherMatch.score < this.score) {
    return true;
  }

  return (this.host.MatchInfo.matchesDone < otherMatch.host.MatchInfo.matchesDone);
};

Match.prototype.toClientObject = function() {
    var _this = this;
    var returnObject = {};

    var visitor = _this.visitor;
    var host = _this.host;

    returnObject.visitorFirstName = visitor.Contact.First;
    returnObject.visitorLastName = visitor.Contact.Last;
    returnObject.hostFirstName = host.Contact.First;
    returnObject.hostLastName = host.Contact.Last;
    returnObject.hostEmail = host.Contact.Email;
    returnObject.section = host.MatchInfo.Section;
    returnObject.visitTime = visitor.MatchInfo['Class Visit Time'];
    returnObject.sectionTime = returnObject.section + returnObject.visitTime.toString();
    returnObject.matchCount = _this.count;

    //this loops through the keys and determines what we are matched on
    for (var i = 0; i < _this.keys.length; i++) {
      returnObject[_this.keys[i]] = _this.matchedOn[_this.keys[i]];
    }

    return returnObject;
  };

module.exports = Match;

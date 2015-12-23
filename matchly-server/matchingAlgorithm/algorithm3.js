var
  Match = require('./Match.js'),
  MATCH_KEYS = require('./matchly-io-keys.js'),
  memoizeMatches = {},
  moment = require('moment');

const DAYS_BETWEEN_MATCHES = 3;

var Rumble = {

  prepForSaving: function(match, date) {
    var visitor = match.visitor;
    var host = match.host;

    visitor.MatchInfo.matchHost = host._id;
    host.MatchInfo.matches.push({
      date: visitor.MatchInfo.visitDate,
      visitor: visitor._id
    });
    return match;
  },

  calculatematchScore: function(visitor, host) {
    //if the visitor has not been meoized yet, make their object
    if (!(visitor._id in memoizeMatches)) {
      memoizeMatches[visitor._id] = {};
    }

    if (!(host._id in memoizeMatches[visitor._id])) {
      var match = new Match(MATCH_KEYS, visitor, host);

      //memoize matches
      memoizeMatches[visitor._id][host._id] = match;
    }

    return memoizeMatches[visitor._id][host._id];
  },

  visitorHostPairings: require('./table-render.js'),

  SortReturnObject: function(returnObject) {
    returnObject = returnObject.sort(function(a, b) {
      return a.sectionTime - b.sectionTime;
    });

    return returnObject;
  },

  SectionReport: function(constraintObject, originalCapacity) {
    //this is not working it is giving incorrect numbers for visitors
    var sections = ['A', 'B', 'C', 'D', 'E'];
    var classVisitorNumbers = [];
    for (var l = 0; l < sections.length; l++) {
      for (var m = 1; m < 4; m++) {
        var section = sections[l] + m.toString();
        var numberOfVisitors = originalCapacity[l][0] - constraintObject[section].availableSpots;
        classVisitorNumbers.push(numberOfVisitors);

        //need to know how many stdudent we could have had
      }
    }

    return classVisitorNumbers;
  },

  getBestMatch: function(curVisitor, hostArray, constraintObject) {
    var bestMatch = null;
    for (var j = 0; j < hostArray.length; j++) {
      var curHost = hostArray[j];
      var match = this.calculatematchScore(curVisitor, curHost);
      if (!match.isBetterThan(bestMatch)) { // If we already have a best match
        continue;
      }

      var oldMatch = curHost.match;
      if (!match.isBetterThan(oldMatch)) {
        continue;
      }

      // Match.constraint key
      var curConstraint = constraintObject[match.constraintKey];
      // If no one is allowed, the host cannot accept this visitor
      if (curConstraint.availableSpots === 0) {
        continue;
      }

      // Need to modify database/availability.js to have the schema provide arrays
      var length = curConstraint.matches.length;

      // If our room is full
      if (length > curConstraint.availableSpots) {
        throw new Error('length should never get bigger than available spots');
      }

      if (length === curConstraint.availableSpots) {

        // If we are not bigger than the lowest
        // Its expected to be sorted by score (do a binary insert whenever we are adding)
        if (!match.isBetterThan(curConstraint.matches[length - 1])) { // If we already have a best match
          continue;
        }
      }

      //we have now determined our current best match
      bestMatch = match;
    } //for loop continues till end of host array

    return bestMatch;
  },

  validateTotalAvailable: function(visitorArray, constraintObject) {
    var totalAvailableSpots = Object.keys(constraintObject).filter(key =>
        key !== '_id' && key !== '__v'
      ).reduce((prev, key) => {
        prev[key.slice(1, 2)] += constraintObject[key].availableSpots;
        constraintObject[key].matches = [];
        return prev;
      }, {1: 0, 2: 0, 3: 0 });


    var unMatchedVisitors = visitorArray.map(function(a) {
      totalAvailableSpots[a.MatchInfo.classVisitNumber]--;
      return a;
    });

    for (var i = 1; i < 4; i++) {
      if (totalAvailableSpots[i] < 0) {
        totalAvailableSpots.type = 'total available lecture spots';
        throw new Error(JSON.stringify(totalAvailableSpots));
      }
    }

    return unMatchedVisitors;
  },

  rumble: function(unfilteredVisitorArray, unfilteredHostArray, constraintObject, date) {
    //host map is an object with the hosts id as the key that hold any hosts that have been previously matched on that date
    var hostMap = {};
    //TODO implement not matching hosts who were matched three days ago
    var hostArray = unfilteredHostArray.filter(function(host) {
      if (host.MatchInfo.matches.some(function(match) {
        return match.date.toString() === date.toString() || moment(date).subtract(DAYS_BETWEEN_MATCHES, 'days').diff(match.date) < 0;
      })) {
        hostMap[host._id] = host;
        return false;
      }
      return true;
    });

    var visitorArray = unfilteredVisitorArray.filter(function(visitor) {
      if (!!visitor.MatchInfo.matchHost) {
        var host = hostMap[visitor.MatchInfo.matchHost];
        var match = new Match(MATCH_KEYS, visitor, host);
        host.match = match;
        visitor.match = match;
        return false;
      }

      return true;
    });

    // check to make sure there are a valid amount of slots left
    var unMatchedVisitors = this.validateTotalAvailable(visitorArray, constraintObject);

    while (unMatchedVisitors.length) {
      var curVisitor = unMatchedVisitors.shift();

      //this goes through all hosts
      var bestMatch = this.getBestMatch(curVisitor, hostArray, constraintObject);
      var newHost = bestMatch.host;

      //the visitor that the host was matched with
      var oldMatch = newHost.match;
      if (oldMatch && oldMatch.visitor) {
        var oldVisitor = oldMatch.visitor;

        // Make the old Visitor have no match
        oldVisitor.match = null;
        unMatchedVisitors.push(oldVisitor);

        // Remove the match from the constraints
        var oldConstraint = constraintObject[oldMatch.constraintKey];
        for (var i = 0, l = oldConstraint.matches.length; i < l; i++) {
          if (oldConstraint.matches[i] !== oldMatch) continue;
          oldConstraint.matches.splice(i, 1);
          break;
        }

        if (i === l) {
          throw new Error('we did not unset the match');
        }
      }

      // curConstraint refers to the specific lecture our host and visitor will be attending togethor
      var curConstraint = constraintObject[bestMatch.constraintKey];
      var length = curConstraint.matches.length;

      // If our room is full
      // We've already declared we are better than the worst on line 229
      if (length >= curConstraint.availableSpots) {
        var lowestMatch = curConstraint.matches.pop();
        var lowestVisitor = lowestMatch.visitor;
        lowestVisitor.match = null;
        unMatchedVisitors.push(lowestVisitor);
      }

      //push the visitor back to the unmatched array
      curConstraint.matches.push(bestMatch);

      //make sure that the lowest score is the last element in the array
      curConstraint.matches.sort(function(a, b) {
        return b.score - a.score;
      });

      newHost.match = bestMatch;
      curVisitor.match = bestMatch;
    }//while loop closes

    memoizeMatches = {};

    return unfilteredVisitorArray.map(function(vis) {
      return Rumble.prepForSaving(vis.match, date);
    });
  }//close rumble
};

//to do:
//add worst matchScore=-1 and worst match index=null to constraintObject
//add if statement to matching to determin if you are the best match for the host and better than the worst match in the class or is there room
module.exports = Rumble;

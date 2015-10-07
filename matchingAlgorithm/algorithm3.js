var Match = require('./Match.js');
var MATCH_KEYS = require('./matchly-io-keys.js');
var memoizeMatches = {};
var Rumble = {
  calculatematchScore:function(visitor,host) {
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

  visitorHostPairings: function(visitorArray) {

    var matches = visitorArray.map(function(visitor) {
      var host = visitor.match.host;
      host.MatchInfo.matchesDone++;

      //the below commmented out code has classVisitNumber as opposed to Class Visit time.  I think we want time because the matching is already done and we're just returning the data to the user.
      // var m = new Match(visitor.Contact.First,visitor.Contact.Last,host.Contact.First,host.Contact.Last,host.Contact.Email,host.MatchInfo.Section,visitor.MatchInfo.classVisitNumber,visitor.MatchInfo.matchScore,visitor.MatchInfo.matchCount,visitor.MatchInfo.matchedOn.Citizenship,visitor.MatchInfo.matchedOn.City,visitor.MatchInfo.matchedOn.Employer,visitor.MatchInfo.matchedOn.Gender,visitor.MatchInfo.matchedOn.Industry,visitor.MatchInfo.matchedOn.Military,visitor.MatchInfo.matchedOn.State,visitor.MatchInfo.matchedOn.Undergrad,visitor.MatchInfo.matchedOn.Country);
      var match = visitor.match.toClientObject();

      return match;
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
  },

  SortReturnObject: function(returnObject) {
    returnObject = returnObject.sort(function(a,b) {
      return a.sectionTime - b.sectionTime;
    });

    return returnObject;
  },

  SectionReport:function(constraintObject,originalCapacity) {
    //this is not working it is giving incorrect numbers for visitors
    var sections = ['A','B','C','D','E'];
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
      if (length >= curConstraint.availableSpots) {

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
    var totalAvailableSpots = {};
    for (var i = 1; i < 4; i++) {
      var total = 0;
      var SectionLetters = ['A','B','C','D','E'];
      for (var j = 0; j < SectionLetters.length; j++) {
        var currentLecture = constraintObject[SectionLetters[j] + i];
        total += currentLecture.availableSpots;
        currentLecture.matches = [];
      }

      totalAvailableSpots[i] = total;
    }

    var unMatchedVisitors = visitorArray.map(function(a) {
      totalAvailableSpots[a.MatchInfo.classVisitNumber]--;
      return a;
    });

    for (var i = 1; i < 4; i++) {
      if (totalAvailableSpots[i] < 0) {
        totalAvailableSpots.type = 'total available lecture spots';
        throw totalAvailableSpots;
      }
    }

    return unMatchedVisitors;
  },

  rumble: function(visitorArray, hostArray, constraintObject) {
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
        for (var i = 0; i < oldConstraint.matches.length; i++) {
          if (oldConstraint.matches[i] !== oldMatch) continue;

          oldConstraint.matches.splice(i, 1);
          break;
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
      curConstraint.matches.sort(function(a,b) {
        return b.score - a.score;
      });

      newHost.match = bestMatch;
      curVisitor.match = bestMatch;
    }//while loop closes

    var visitorHostPairings = this.visitorHostPairings(visitorArray);
    visitorHostPairings = this.SortReturnObject(visitorHostPairings);

    // var sectionReport = this.SectionReport(constraintObject, originalCapacity);

    //add section report and make it work
    //also fix the sort function!!!!
    memoizeMatches = {};
    return visitorHostPairings;
  }//close rumble
};

//to do:
//add worst matchScore=-1 and worst match index=null to constraintObject
//add if statement to matching to determin if you are the best match for the host and better than the worst match in the class or is there room
module.exports = Rumble;

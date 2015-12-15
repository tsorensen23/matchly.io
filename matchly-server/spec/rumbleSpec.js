/*[> eslint-env mocha, node <] */

var rumble = require('../matchingAlgorithm/algorithm3');
var expect = require('chai').expect;
var Availability = require('../server/database/models/Availability');

describe('rumble', function() {
  var visitors = require('./mocks/visitors.json');
  var hosts = require('./mocks/hosts.json');
  var availability = new Availability();

  describe('calculate match score', function() {
    it('calculate match score between the first visitor and host', function() {
      var matchScore = rumble.calculatematchScore(visitors[0], hosts[0]);
      expect(matchScore.score).to.eq(111000000);
      expect(matchScore.count).to.eq(3);
    });
  });

  describe('best match score', function() {
    it('calculate the best match scores between the visitor, hosts and constraint', function() {
      var vistChars = JSON.parse(JSON.stringify(visitors[0].Characteristics));
      var hostChars = JSON.parse(JSON.stringify(hosts[1].Characteristics));
      var match = rumble.getBestMatch(visitors[0], hosts, availability);
      expect(match.host).to.eq(hosts[1]);
      expect(match.score).to.eq(111100000);
      expect(hostChars.Gender === vistChars.Gender).to.eq(match.matchedOn.Gender);
      expect(hostChars.State === vistChars.State).to.eq(match.matchedOn.State);
      expect(hostChars.Industry === vistChars.Industry).to.eq(match.matchedOn.Industry);
      expect(hostChars.Employer === vistChars.Employer).to.eq(match.matchedOn.Employer);
      expect(hostChars.Undergrad === vistChars.Undergrad).to.eq(match.matchedOn.Undergrad);
      expect(hostChars.Citizenship === vistChars.Citizenship).to.eq(match.matchedOn.Citizenship);
      expect(hostChars.Country === vistChars.Country).to.eq(match.matchedOn.Country);
      expect(hostChars.Military === vistChars.Military).to.eq(match.matchedOn.Military);
    });
  });

  describe('validateTotalAvailable', function() {
    it('should throw error when not enough spaces are available', function() {
      var availability = new Availability();
      ['A','B','C','D','E'].forEach(function(letter) {
        for (var number = 1; number < 4; number++) {
          availability[letter + number].availableSpots = 0;
        }
      });

      expect(
        rumble.validateTotalAvailable
        .bind(rumble, visitors, availability)
      ).to.throw();
    });

    it('should not throw error when enough spaces are available', function() {
      var availability = new Availability();
      ['A','B','C','D','E'].forEach(function(letter) {
        for (var number = 1; number < 4; number++) {
          availability[letter + number].availableSpots = 69;
        }
      });

      expect(
        rumble.validateTotalAvailable
        .bind(rumble, visitors, availability)
      ).to.not.throw();
    });
  });

});

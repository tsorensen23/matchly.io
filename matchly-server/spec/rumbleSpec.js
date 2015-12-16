/*[> eslint-env mocha, node <] */

var rumble = require('../matchingAlgorithm/algorithm3');
var expect = require('chai').expect;
var Availability = require('../server/database/models/Availability');
var Visitor = require('../server/database/db').Visitor;
var Host = require('../server/database/db').Host;
var mongoose = require('mongoose');

describe('rumble', function() {
  afterEach(function(done) {
    Visitor.find({}).remove().exec();
    Host.find({}).remove().exec();
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.connection.close();
    done();
  })
  var visitors = Visitor.create(require('./mocks/visitors.json'));
  var hosts = Host.create(require('./mocks/hosts.json'));
  var availability = new Availability();

  describe('calculate match score', function() {
    it('should return 0 when there is no match', function() {
      let visitor = new Visitor({
        Characteristics: {
          Military: 'Veteran',
          Citizenship: 'USA',
          Industry: 'Pharmaceuticals'
        },
        Contact: {
          First: 'Rob',
          Last: 'Wilkinson'
        }
      });
      visitor.save();
      let host = new Host({
        Characteristics: {
          Military: '',
          Citizenship: ''
        },
        Contact: {
          First: 'Norman',
          Last: 'Schwatrzkopf'
        }
      });
      host.save();

      var matchScore = rumble.calculatematchScore(visitor, host);
      expect(matchScore.score).to.eq(0);
      expect(matchScore.count).to.eq(0);
    });
    it('should return Proper Match Count when there is match', function() {
      let visitor = new Visitor({
        Characteristics: {
          Military: 'Veteran',
          Citizenship: 'USA'
        },
        Contact: {
          First: 'Rob',
          Last: 'Wilkinson'
        }
      });
      let host = new Host({
        Characteristics: {
          Military: '',
          Citizenship: 'USA'
        },
        Contact: {
          First: 'Norman',
          Last: 'Schwatrzkopf'
        }
      });

      var matchScore = rumble.calculatematchScore(visitor, host);
      expect(matchScore.count).to.eq(1);
      expect(matchScore.score).to.eq(1000000);
    });
  });

  // describe('validateTotalAvailable', function() {
  //   it('should throw error when not enough spaces are available', function() {
  //     var availability = new Availability();
  //     ['A','B','C','D','E'].forEach(function(letter) {
  //       for (var number = 1; number < 4; number++) {
  //         availability[letter + number].availableSpots = 0;
  //       }
  //     });

  //     expect(
  //       rumble.validateTotalAvailable
  //       .bind(rumble, visitors, availability)
  //     ).to.throw();
  //   });

  //   it('should not throw error when enough spaces are available', function() {
  //     var availability = new Availability();
  //     ['A','B','C','D','E'].forEach(function(letter) {
  //       for (var number = 1; number < 4; number++) {
  //         availability[letter + number].availableSpots = 69;
  //       }
  //     });

  //     expect(
  //       rumble.validateTotalAvailable
  //       .bind(rumble, visitors, availability)
  //     ).to.not.throw();
  //   });
  // });

});

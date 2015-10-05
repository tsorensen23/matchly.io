/* eslint-env mocha, node */
var rumble = require('../matchingAlgorithm/algorithm3')
  , mongo = require('mongodb').MongoClient
  , db
  , expect = require('chai').expect;
describe('rumble', function() {
  describe('calculate match score', function () {
    beforeEach(function(done) {
      mongo.connect('mongodb://localhost/matchly', function(err, connection) {
          if(err) {
            done(err);
          }
          db = connection;
          db.listCollections().toArray(function(err, items) {
            if(err) {
              done(err);
            }
            // uncomment this to list collections
            //console.log(items);
            done();
          })
          });
    });
    it('calculate match score between the first visitor and host', function (done) {
      db.collection('visitorprofiles').find().toArray(function(err, visitors) {
        if(err) {
          done(err);
        }
        db.collection('hostprofiles').find().toArray(function(err, hosts) {
          if(err) {
            done(err);
          }
          var matchScore = rumble.calculatematchScore(visitors[0], hosts[0]);
          expect(matchScore.score).to.eq(100100000);
          expect(matchScore.count).to.eq(2);
          done();
        });
      });
    });
  });
});

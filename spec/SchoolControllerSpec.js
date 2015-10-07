/* eslint-env mocha, node */
var expect = require('chai').expect;
var request = require('request');
describe('SchoolsController', function() {
  describe('A request to /schools returns all schools', function() {
    var response;
    var body;
    before(function(done) {
      request.get('http://localhost:3000/schools', function(err, res, b) {
        if (err) {
          console.log(err);
        }

        response = res;
        body = b;
        done();
      });
    });

    it('returns a 200 success code', function(done) {
      expect(response.statusCode).to.eq(200);
      done();
    });

    it('returns json data', function(done) {
      expect(response.headers['content-type']).to.eq('application/json; charset=utf-8');
      done();
    });

    it('has 6351 schools', function(done) {
      expect(JSON.parse(body)).to.have.length(6531);
      done();
    });
  });

  describe('a post to /checkschools returns the school id of that school', function() {
    var response;
    var body;
    it('returns blank for a school that is not in there', function(done) {
      console.log('this test is running');
      var payload = {"names": ["aasdhasjkdha"]};
      request.post({
        method: 'POST',
        uri: 'http://localhost:3000/checkschools',
        json: payload
      }, function(err, res, b) {
        if (err) {
          console.log(err);
        }
        response = res;
        body = b;
        expect(response.statusCode).to.eq(200);
        expect(body["aasdhasjkdha"]).to.eql(null);
        done();
      });
    });
    it('returns the school ID for a school that is in there', function(done) {
      console.log('this test is running');
      var payload = {"names": ["Duquesne University"]};
      request.post({
        method: 'POST',
        uri: 'http://localhost:3000/checkschools',
        json: payload
      }, function(err, res, b) {
        if (err) {
          console.log(err);
        }
        expect(response.statusCode).to.eq(200);
        expect(b).to.eql('56145d4fdd75372612b572c2');
        done();
      });
    });
  });
});

/* eslint-env mocha, node */
var expect = require('chai').expect;
var request = require('superagent');
var cp = require('child_process');
var User = require('../server/database/db').User;
describe('SchoolsController', function() {
  var server;
  before(function(next) {
    User.create({firstName: 'rob', lastName: 'wilkinson', emailAddress: 'rob@rob.com', username: 'robw', password: 'robw', matchlycookie: '1234'}, function(err, data) {
      console.log(err);
      console.log(data);
    server = cp.fork(__dirname + '/../server/server', {silent:true});
    server.on('message', function(mess) {
      if (mess === 'ready') {
          next();
        }
    });
    })
  });

  after(function(done) {
    server.kill();
    User.find({}).remove().exec().then(function(){
      done()
    });
  });

  describe('A request to /schools returns all schools', function() {
    var response;
    var body;
    before(function(done) {
      request
        .get('http://localhost:3000/schools')
        .set('matchlycookie', '1234')
        .end(function(err, res, b) {
        if (err) {
          console.log(err);
        }

        response = res;
        body = b;
        console.log(res);
        done();
      });
    });

    xit('returns a 200 success code', function(done) {
      expect(response.statusCode).to.eq(200);
      done();
    });

    xit('returns json data', function(done) {
      expect(response.headers['content-type']).to.eq('application/json; charset=utf-8');
      done();
    });

    xit('has 6351 schools', function(done) {
      expect(JSON.parse(body)).to.have.length(6531);
      done();
    });
  });

  describe('a post to /checkschools returns the school id of that school', function() {
    var response;
    var body;
    xit('returns blank for a school that is not in there', function(done) {
      var payload = {names: ['aasdhasjkdha']};
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
        expect(body.aasdhasjkdha).to.eql(null);
        done();
      });
    });

    xit('returns the school ID for a school that is in there', function(done) {
      var payload = {names: ['Duquesne University']};
      request.post({
        method: 'POST',
        uri: 'http://localhost:3000/checkschools',
        json: payload
      }, function(err, res, b) {
        if (err) {
          console.log(err);
        }

        expect(response.statusCode).to.eq(200);
        expect('Duquesne University' in b).to.eql(true);
        expect(typeof b['Duquesne University']).to.eql('string');
        expect(b['Duquesne University']).to.eql('Duquesne University');

        done();
      });
    });
  });
});

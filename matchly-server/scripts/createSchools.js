#!/usr/bin/env node
var School = require('../server/database/db').School;
var request = require('request');
School.find({}).remove().exec().then(function() {

var URL = 'https://sheetsu.com/apis/059b4d69';
request.get(URL, function(err, resp, data) {
  if (err) {
    throw new Error(err);
  } else {
    data = JSON.parse(data);
    var schools = data.result.map(function(school) {
      return school.schoolName;
    });

    schools.forEach(function(schoolname) {
      var school = new School({name: schoolname});
      school.save();
      console.log(school);
    });

    console.log('done');
  }
});
})

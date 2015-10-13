var School = require('../server/database/db').School;
var request = require('request');

var URL = 'https://sheetsu.com/apis/9e9f4f71';

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

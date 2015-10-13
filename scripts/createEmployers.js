var Employer = require('../server/database/db').Industry;
var request = require('request');

var URL = 'https://sheetsu.com/apis/7100adf4';

request.get(URL, function(err, resp, data) {
  if (err) {
    throw new Error(err);
  } else {
    data = JSON.parse(data);
    var employers = data.result;
    Employer.create(employers, function(err, results) {
      if(err) throw err;
      console.log(results);
    })


    console.log('done');
  }
});

var db = require('./server/database/db');
var moment = require('moment');
// db.Visitor.find({}).remove().exec()
db.Visitor.count(function(num){
  console.log(num);
})

db.Visitor.find({}, function(err, data) {
  if(err) throw err;
  data.forEach(function(visitor) {
    console.log(visitor);
  })
})

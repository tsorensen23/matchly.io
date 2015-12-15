var db = require('../server/database/db');

db.Visitor.find({}).remove().exec(function(data){
  console.log(data);})

var db = require('../server/database/db');

db.Availability.create().exec().then(function(data) {
  console.log(data);
})

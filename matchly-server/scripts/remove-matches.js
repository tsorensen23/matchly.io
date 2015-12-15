var db = require('../server/database/db')
db.Host.find({}, function(err, data){
  data.forEach(function(host){
    host.MatchInfo.matches = [];
    host.save();
  })
})


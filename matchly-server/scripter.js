var db = require('./server/database/db');
db.Host.find({}, function(err, data) {
  data.forEach(function(host) {
    if(host.Characteristics.Country === ""){
      console.log('matched');
      host.Characteristics.Country = 'United States';
      host.save(function(err) {
        if(err) console.log(err)
      });
    }
    if(host.Characteristics.State === ''){
      host.Characteristics.State = ' ';
    }
    host.save(function(err) {
      if(err) {
      console.log(err);
      }
    });
  })
})

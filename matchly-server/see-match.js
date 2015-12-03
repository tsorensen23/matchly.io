var db = require('./server/database/db')
var mpath = require('mpath');

db.Host.find({}, function(err, data) {
  console.log(mpath.get('Characteristics.Military', data));
  var nonecount = 0;
  var vetcount = 0; 
  var yescount = 0;
  var other = [];
  data.forEach(function(host) {
    if(host.Characteristics.Military === 'None'){
      nonecount++;
    }
    else if(host.Characteristics.Military === 'Yes'){
      yescount++;
    }
    else if(host.Characteristics.Military === 'Veteran'){
      vetcount++;
    } else {
      other.push(host.Characteristics.Military);
    }
  });
  console.log(nonecount, yescount, vetcount);
  console.log(other);
});

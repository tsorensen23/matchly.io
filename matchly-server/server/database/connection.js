var mongoose = require('mongoose');
var connect;
mongoose.connect(process.env.MONGO_URI || 'mongodb://admin:nala&mars@ds023388.mlab.com:23388/matchly-netgear');
mongoose.connection.on('error', function(err) {
  console.error('connection error ', err);

  // throw err;
});

mongoose.connection.on('connected', function() {
  connect = true;
});

mongoose.connection.on('disconnected', function() {
  connect = false;
});

module.exports = mongoose;

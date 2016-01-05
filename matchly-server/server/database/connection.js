var mongoose = require('mongoose');
var connect;
mongoose.connect(process.env.MONGO_URI || 'mongodb://admin:nala&mars@ds039155.mongolab.com:39155/matchly');
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

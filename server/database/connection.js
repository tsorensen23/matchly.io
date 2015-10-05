var mongoose = require('mongoose');
var connect;
mongoose.connect(process.env.MONGO_URI || 'mongodb://travis:abc123@ds041188.mongolab.com:41188/finalproject');
mongoose.connection.on('error', function(err){
  console.error('connection error ', err);
  // throw err;
});
mongoose.connection.on('connected', function(){
  connect = true;
});
mongoose.connection.on('disconnected', function(){
  connect = false;
});

module.exports = mongoose;

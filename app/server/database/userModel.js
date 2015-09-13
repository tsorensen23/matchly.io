var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	schoolCode: {type: String, required:true},
  firstName: {type: String, required:true},
  lastName: {type: String, required:true},
  emailAddress: {type: String, required:true},
  username: {type: String, required:true},
	password: {type: String, required:true},
  matchlycookie: {type: String, required:false}
});

module.exports = mongoose.model('UserController', userSchema);
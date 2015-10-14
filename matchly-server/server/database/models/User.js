var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../connection');

var userSchema = new Schema({

  //  schoolCode: {type: Schema.Types.ObjectId, ref: 'School'},
  firstName: {type: String, required:true},
  lastName: {type: String, required:true},
  emailAddress: {type: String, required:true},
  username: {type: String, required:true},
  password: {type: String, required:true},
  matchlycookie: {type: String, required:false}
});

module.exports = db.model('UserController', userSchema);

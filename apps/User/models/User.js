var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  roles: [String]
});

module.exports = mongoose.model('User', userSchema);

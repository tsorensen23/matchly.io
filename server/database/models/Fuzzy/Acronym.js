var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var Acronym = new Schema({
  value: {type:String, index:true, unique:true,},
  full: {type:[ObjectId], ref:'Full',},
});

Acronym.methods.toString = function() {
  return this.value;
};

module.exports = db.model('Acronym', Acronym);

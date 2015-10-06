var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var db = require('../../connection');

var Alias = new Schema({
  value: {type:String, index:true, unique:true,},
  full: {type:ObjectId, ref: 'Full',},
});

Alias.methods.toString = function() {
  return this.value;
};

module.exports = db.model('Alias', Alias);

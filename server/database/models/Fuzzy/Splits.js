var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var Splits = new Schema({
  value: {type:String, index:true, unique: true},
  fulls: {type:[ObjectId], ref: 'Full',},
});

Splits.methods.toString = function() {
  return this.value;
};

module.exports = db.model('Splits', Splits);

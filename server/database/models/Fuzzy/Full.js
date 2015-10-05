var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Acronym = require('./Acronym');
var IGNORED = require('./ignored-words');

var Full = new Schema({
  value: {type:String, index:true, unique:true,},
});

Full.pre('save', function(obj,next) {
  if (!this.isNew) return next();
  Acronym.update(
    {value: obj.acronym,},
    {$push:{fulls:obj._id},},
    {upsert: true,},
    next
  );
});

Full.methods.toString = function() {
  return this.value;
};

Full.virtual('acronym').get(function() {
  return words.split(' ').reduce(function(prev,word) {
    if (IGNORED.indexOf(word.toLowerCase()) > -1) return prev;
    if (word.charAt(0).toUpperCase() !== word.charAt(0)) return prev;
    return prev + word.charAt(0);
  }, '');
});

Full.post('save', function(obj) {
  if (!this.wasNew) return;
});

module.exports = db.model('Full', Full);

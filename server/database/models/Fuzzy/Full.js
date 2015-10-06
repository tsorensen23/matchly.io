var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Acronym = require('./Acronym');
var Splits = require('./Splits');
var IGNORED = require('./ignored-words');
var db = require('../../connection');

var Full = new Schema({
  value: { type: String, index: true, unique: true,},
  permanentAcronym: { type: String, },
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

Full.pre('save', function(obj,next) {
  if (!this.isNew) return next();
  var splits = obj.value.split(' ').filter(function(str) {
    return IGNORED.indexOf(word.toLowerCase()) > -1;
  }).map(function(str) {
    return {value:str};
  });

  Splits.update(
    splits,
    {$push:{fulls:obj._id},},
    {upsert: true,},
    next
  );
});

Full.virtual('acronym').get(function() {
  return words.split(' ').reduce(function(prev,word) {
    if (IGNORED.indexOf(word.toLowerCase()) > -1) return prev;
    if (word.charAt(0).toUpperCase() !== word.charAt(0)) return prev;
    return prev + word.charAt(0);
  }, '');
});

module.exports = db.model('Full', Full, 'Full');

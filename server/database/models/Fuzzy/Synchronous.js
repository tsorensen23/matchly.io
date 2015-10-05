
var IGNORED = require('./ignored-words');
function Fuzzy(list) {
  this.acronyms = {};
  this.fulls = [];
  list.forEach(this.addFull.bind(this));
}

Fuzzy.prototype.addFull = function(words) {
  words = this.scrub(words);
  var acronym = this.acronym(words);
  if (!(acronym in this.acronyms)) {
    this.acronyms[acronym] = [];
  }

  this.acronyms[acronym].push(words);
  this.fulls.push(words);
};

Fuzzy.prototype.scrub = function(words) {
  return words
    .replace(/\W/, ' ')
    .replace(/\s+/, ' ')
    .replace(/^\s|\s$/, '');
};

Fuzzy.prototype.acronym = function(words) {
  return words.split(' ').reduce(function(prev,word) {
    if (IGNORED.indexOf(word.toLowerCase()) > -1) return prev;
    if (word.charAt(0).toUpperCase() !== word.charAt(0)) return prev;
    for (var i = 1, l = word.length; i < l; i++) {
      if (word.charAt(1).toUpperCase() !== word.charAt(1)) {
        return prev + word.charAt(0);
      }
    }

    return prev + word;
  }, '');
};

Fuzzy.prototype.getFull = function(word) {
  // TODO: Rawb o.o
};

module.exports = Fuzzy;

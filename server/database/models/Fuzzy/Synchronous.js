
var IGNORED = require('./ignored-words');
function Fuzzy(list) {
  this.acronyms = {};
  this.splits = {};
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

  var splits = words.split(' ');
  splits.forEach(function(word) {
    if (!(word in this.splits)) {
      this.splits[word] = [];
    }

    this.splits[word].push(words);
  }.bind(this));

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

// RETURNS {found:String, poss:[String]}
Fuzzy.prototype.getFull = function(word) {
  word = this.scrub(word);
  var fs = this.fulls;
  var i;
  var l;

  var ret = {found:void 0,poss:[]};

  // Exists or not
  for (i = 0, l = fs.length; i < l; i++) {
    if (word.toUpperCase() === fs[i].toUpperCase()) {
      ret.found = fs[i];
      break;
    }
  }

  var acryMatch = this.matchOnAcronyms(word);
  if (!ret.found) ret.found = acryMatch.found;
  ret.poss = ret.poss.concat(acryMatch.poss);

  var splitsMatch = this.matchOnSplits(word);
  ret.poss = ret.poss.concat(splitsMatch);

  return poss;
};

Fuzzy.prototype.matchOnAcronyms = function(word) {
  var ret = {found: void 0, poss:[]};
  var wAcronym = this.acronym(word);

  if (wAcronym in this.acronyms) {
    if (this.acronyms[wAcronym].length === 1) {
      ret.found = this.acronyms[wAcronym][0];
    }

    ret.poss.push.apply(ret.poss, this.acronyms[wAcronym]);
  }

  var poss = [];
  var keys = Object.keys(this.acronyms);
  for (i = 0, l = keys.length; i < l; i++) {
    if (wAcronym === keys[i]) continue;

    if (new RegExp('^' + escapeRegExp(keys[i])).test(wAcronym)) {
      poss.push.apply(poss, this.acronyms[keys[i]]);
      continue;
    }

    if (new RegExp('^' + escapeRegExp(wAcronym)).test(keys[i])) {
      poss.push.apply(poss, this.acronyms[keys[i]]);
      continue;
    }
  }

  return poss;
};

Fuzzy.prototype.matchOnSplits = function(word) {
  var poss = [];
  var splits = words.split(' ');
  splits.forEach(function(word) {
    if (word in this.splits) {
      poss.push.apply(poss, this.splits[word]);
    }
  }.bind(this));
  return poss;
};

module.exports = Fuzzy;

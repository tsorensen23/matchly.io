function MatchKey(key, incrementalScore) {
  this.key = key;
  this.incrementalScore = incrementalScore;
}

MatchKey.prototype.toString = function() {
  return this.key;
};

module.exports = MatchKey;

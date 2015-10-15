module.exports = function(location) {
  return function() {
    window.location = location;
  };
};

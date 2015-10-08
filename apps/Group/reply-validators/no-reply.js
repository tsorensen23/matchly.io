module.exports = function(message, reply, next) {
  next(new Error('This message should never get a reply'));
};

module.exports = function(message, reply, next) {
  if (message.reply.replies.length === 0) {
    return next(new Error('This message is only expecting one reply'));
  }

  next();
};

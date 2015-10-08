module.exports = function(message, reply, next) {
  if (message.reply.replies.length === message.to.length) {
    return next(new Error('This message recieved all replies it was expecting'));
  }

  var Message = message.constructor;
  Message.find({_id:{$in:message.reply.replies}}, 'from', function(err,replies) {
    var repliers = replies.map(function(reply) { return reply.from; });

    if (repliers.indexOf(reply.from) !== -1) {
      return next(new Error('This user has already reply to this message'));
    }

    return next();
  });
};

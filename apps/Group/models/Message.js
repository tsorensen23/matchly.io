var mongoose = require('mongoose');
var Schema = mongoos.Schma;
var Notifier = require('./Notifier');

var async = require('async');
var request = require('request');

var Notifier = require('./Notifier');
var ReplyValidators = require('../reply-validators');

var MessageSchema = Schema({
  from:{
    type: Schema.Types.ObjectId,
    ref: 'Notifier',
    index: true,
    required: true
  },
  to:{
    type: [Schema.Types.ObjectId],
    ref: 'Notifier',
    index: true,
    required: true
  },
  message: {
    date: {type: Number, default: Date.now},
    subject: {type: String, required: true},
    content: {type: String, required: true}
  },
  reply: {
    replyValidators: {type:[String], required:true},
    expiration: {type:Number, default:-1},
    public: {type:Boolean, default:false}, // Should a reply hit all users
    parent: {type: Schema.Types.ObjectId, ref: 'Message'},
    replies: [{type: Schema.Types.ObjectId, ref: 'Message'}]
  }
});

MessageSchema.methods.willAcceptReply = function(reply, next) {
  var _this = this;
  async.each(this.reply.replyValidators, function(validator, next) {
    ReplyValidators[validator](_this, reply, next);
  }, next);
};

MessageSchema.statics.handleReply = function(messageId, replyUser, provider, content, next) {
  this.findOneById(messageId, function(err, message) {
    if (err) return next(err);
    if (!message) {
      return next(new Error('This message does not exist'));
    }

    var reply = message.reply;

    if (reply.expiration > -1 && message.message + reply.expiration < Date.now()) {
      return next(new Error('This message has expired'));
    }

    if (message.to.indexOf(replyUser) === -1) {
      return next(new Error('This message is not expecting a reply from this user'));
    }

    var returnMessage;
    try {
      returnMessage = NotificationProviders[provider].parse(content);
    } catch (err) {
      return next(err);
    }

    var toNotify;
    if (reply.public) {
      toNotify = message.to.slice(0);
      toNotify.push(message.from);
      toNotify.splice(toNotify.indexOf(replyUser._id));
    } else {
      toNotify = [message.from];
    }

    var replyMessage = new MessageSchema({
      from: replyUser,
      to: toNotify,
      message: returnMessage,
      reply: {
        replyValidator: reply.replyValidator,
        parent: message,
        expiration: reply.expiration
      }
    });

    message.willAcceptReply(replyMessage, function(err) {
      if (err) return next(err);
      replyMessage.save(next);
    });

  });
};

MessageSchema.pre('save', function(next) {
  if (!this.isNew) return next();
  Notifier.notifyEach(this.to, this, next);
});

MessageSchema.pre('save', function(next) {
  if (!this.isNew) return next();
  this.constructor.update({_id:this.reply.parent}, {$push:{'reply.replies': this._id}}, next);
});

module.exports = mongoose.model('Message', MessageSchema);

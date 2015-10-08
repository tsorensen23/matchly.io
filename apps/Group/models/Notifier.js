var mongoose = require('mongoose');
var Schema = mongoos.Schma;
var User = require('./User');
var Notifier;
var async = require('async');

var NotificationProviders = require('../notification-providers');

var NotifierSchema = Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    unique: true,
    required: true
  },
  preferred: {type: String},
  providers: [{
    title: {type:String, required: true},
    providerType:{type:String, required:true},
    meta: Object
  }]
});

User.schema.post('remove', function(user) {
  Notifier.removeOne({user:user}, function(err, notifier) {
    if (err) throw err;
  });
});

NotifierSchema.statics.notifyEach = function(array, message, next) {
  this.find({_id:{$in:array}}, function(err, list) {
    if (err) return next(err);
    async.each(list, function(notifier, next) {
      notifier.notify(message, next);
    }, next);
  });
};

NotifierSchema.methods.notify = function(message, next) {
  var preferred = this.preferred;
  var notifyProvider = this.providers.reduce(function(prev, curr) {
    if (prev !== null) return prev;
    if (preferred !== curr.title) return prev;
    return curr;
  }, null);

  NotificationProviders[notifyProvider.providerType].notify(
    this, notifyProvider.meta, message, next
  );
};

NotifierSchema.pre('save', function(next) {
  var titles = [];
  async.each(this.providers, function(provider, next) {
    if (titles.indexOf(provider.title) > -1) {
      return next(new Error('Two methods have the same title'));
    }

    titles.push(provider.title);
    NotificationProviders[notifyMethod.providerType].validate(provider.meta, next);
  }, next);
});

Notifier = module.exports = mongoose.model('Notifier', NotifierSchema);

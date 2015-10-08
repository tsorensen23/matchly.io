var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require(__dirname + '/User.js');
var Provider;

var ProviderSchema = new Schema({
  profileId:{
    type: String,
    unique: true,
    index:true,
    required: true
  },
  provider:{
    type: String,
    required: true
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    index:true,
    required: true
  },
  token: String,
  tokenSecret: String
});

ProviderSchema.static('applyToUser', function(user, token, tokenSecret, profile, next) {
  Provider
  .findOne({profileId:profile.provider + '-' + profile.id})
  .populate('user')
  .exec(function(err,provider) {
    if (err) return next(err);
    if (provider) {
      if (user._id != provider.user._id)
        return next(new Error('This profile is already associated to someone else'));
      return next(new Error('This is already connected to you'));
    }

    Provider.create({
      provider: profile.provider,
      profileId: profile.provider + '-' + profile.id,
      user: user,
      token: token,
      tokenSecret: tokenSecret
    }, function(err, provider) {
      next(err, user, provider);
    });
  });
});

ProviderSchema.static('findUser', function(profile, next) {
  Provider
  .findOne({profileId:profile.provider + '-' + profile.id})
  .populate('user')
  .exec(function(err,provider) {
    if (err) return next(err);
    if (!provider) return next();
    next(void 0, provider.user, provider);
  });
});

ProviderSchema.statics.createUser = function(token, tokenSecret, profile, next) {
  User.create({
    username: profile.displayName
  }, function(err, user) {
    if (err) return next(err);
    Provider.create({
      provider: profile.provider,
      profileId: profile.provider + '-' + profile.id,
      user: user,
      token: token,
      tokenSecret: tokenSecret
    }, function(err, provider) {
      if (err) return next(err);
      return next(void 0, user, provider);
    });
  });
};

ProviderSchema.post('remove', function(doc) {
  Provider.find({user:doc.user}, function(err, docs) {
    if (err) throw err;
    if (docs.length > 0) return;
    User.findOneAndRemove({_id:doc.user}, function(err) {
      if (err) throw err;
    });
  });
});

User.schema.post('remove', function(doc) {
  Provider.find({user:doc.user}).remove(function(err, docs) {
    if (err) throw err;
  });
});

Provider = mongoose.model('Provider', ProviderSchema);

module.exports = Provider;

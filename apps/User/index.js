module.exports = function(config,next){
  var passport = require('./passport.config.js');
  next(void 0,{
    strategy:function(type){
      return passport._strategies[type];
    },
    router:require("./router"),
  });
};

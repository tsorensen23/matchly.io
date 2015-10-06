var curUser = void 0;
var req = void 0;
var cbs = [];

module.exports.getUser = function(next) {
  if (curUser) return next(void 0, curUser);
  if (req) return cbs.push(next);

  cbs = [next];

  var profileObject = {cookie: document.cookie};

  req = $.ajax({
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(profileObject),
    url: '/checkLogin',
    success: function(data) {
      req = void 0;
      curUser = data;
      while (cbs.length) cbs.pop()(void 0, data);
    },

    error: function(error) {
      req = void 0;
      curUser = data;
      while (cbs.length) cbs.pop()(void 0, error);
    }
  });
};

module.exports.logout = function() {

};

module.exports.login = function(data) {

};

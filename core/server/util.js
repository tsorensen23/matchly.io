var fs = require('fs');
var path = require('path');

var appServerConfigs = {};

fs.readdirSync(__apps).forEach(function(appname) {
  var p = path.join(__apps, appname, 'controller', 'config.json');
  var config = appServerConfigs[appname] = fs.existsSync(p) ? require(p) : {};

  if (!('urlPath' in config)) config.urlPath = appname;
  if (!('important' in config)) config.important = false;

});

module.exports.getUrl = function(req, appname) {
  return req.protocol + '://' + req.get('host') + appServerConfigs[appname].urlPath;
};

var hosts = void 0;
var EE = require('events').EventEmitter;
var ee = new EE();

module.exports = ee;

module.exports.getAll = function(next) {
  if (hosts) return setTimeout(function() { next(void 0, hosts); }, 1);

  $.ajax({
    url: '/hosts',
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json',
    success: function(data, textStatus, jqXHR) {
      hosts = data;
      next(void 0, data);
    }.bind(this),

    error: function(jqXHR, textStatus, errorThrown) {
      next(errorThrown);
    }

  });
};

module.exports.set = function(host, next) {
  $.ajax({
    url: '/hosts/' + host._id,
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(host),
    success: function(data, textStatus, jqXHR) {
      for (var i in host) {
        data[i] = host[i];
      }

      ee.emit('hosts-updated', hosts);
    }.bind(this),

    error: function(jqXHR, textStatus, errorThrown) {
      next(errorThrown);
    }

  });
};

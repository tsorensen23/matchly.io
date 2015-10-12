var EE = require('events').EventEmitter;

var stores = {};

module.exports = function(url) {
  var name;
  if (!/^\//.test(url)) {
    name = url;
    url = '/' + url;
  } else {
    name = url.substring(1);
  }

  if (name in stores) return stores[name];

  var cached = void 0;
  var ee = new EE();

  ee.getAll = function(query, next) {
    if (cached) return setTimeout(function() { next(void 0, cached); }, 1);

    $.ajax({
      url: url + '/',
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      data: query,
      success: function(data, textStatus, jqXHR) {
        cached = data;
        next(void 0, data);
      }.bind(this),

      error: function(jqXHR, textStatus, errorThrown) {
        next(errorThrown);
      }

    });
  };

  ee.set = function(item, values) {
    $.ajax({
      url: url + '/' + item._id,
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(values),
      success: function(data, textStatus, jqXHR) {
        for (var i in data) {
          item[i] = data[i];
        }

        console.log(name, '-updated');
        ee.emit(name + '-updated', cached);
      }.bind(this),

      error: function(jqXHR, textStatus, errorThrown) {
        ee.emit('error', errorThrown);
      }

    });
  };

  stores[name] = ee;
  return ee;
};

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

  var ee = new EE();
  ee.cached = [];

  ee.getAll = function(query, next, force) {
    var isall = Object.keys(query).length === 0;
    if (ee.cached.length && !force && isall) {
      if (next) next(void 0, ee.cached);
      else ee.emit(name + '-updated', ee.cached);
      return;
    }

    $.ajax({
      url: url + '/',
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      data: query,
      success: function(data, textStatus, jqXHR) {
        if (isall) ee.cached = data;
        if (next) next(void 0, data);
        else ee.emit(name + '-updated', data);
      }.bind(this),

      error: function(jqXHR, textStatus, errorThrown) {
        if (next) next(errorThrown);
        else ee.emit('error', errorThrown);
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

        ee.emit(name + '-updated', ee.cached);
      }.bind(this),

      error: function(jqXHR, textStatus, errorThrown) {
        ee.emit('error', errorThrown);
      }

    });
  };

  ee.run = function(suburl, values, next) {
    $.ajax({
      url: url + '/' + suburl,
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      data: values,
      success: function(data, textStatus, jqXHR) {
        console.log(data);
        if (next) return next(void 0, data);
        if (!data.update) return;
        for (var name in data.update) {
          if (!(name in stores)) return;
          var cached = stores[name].cached;
          var toUpdate = data.update[name];
          for (var i = 0, l = toUpdate.length; i < l; i++) {
            var updatedItem = toUpdate[i];
            for (var ii = 0, ll = cached.length; ii < ll; ii++) {
              if (updatedItem._id === cached[ii]._id) {
                var currentItem = cached[ii];
                for (var key in updatedItem) {
                  currentItem[key] = updatedItem[key];
                }

                break;
              }
            }
          }

          stores[name].emit(name + '-updated', cached);
        }

        if (next) next(void 0, data);
      },

      error: function(jqXHR, textStatus, errorThrown) {
        if (next) return next(errorThrown);
        ee.emit(errorThrown);
      }

    });
  };

  stores[name] = ee;
  return ee;
};

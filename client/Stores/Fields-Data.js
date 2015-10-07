var EE = require('events').EventEmitter;

var Categories = require('./Categories.js');

var ee = new EE();

module.exports = ee;

ee.createStore = function(type, data, school) {
  this.emit('new-Store', new StatefulFields(type, data, school));
};

function StatefulFields(type, data, school) {
  EE.call(this);
  data = Papa.parse(data, {header:true});

  this.rawData = data.data;

  this.school = school;

  var requested = category.requested;
  var matched = this.matched = {};
  var available = this.available = data.meta.fields;

  var _this = this;
  $.ajax({
    method: 'POST',
    contentType: 'application/json',
    url: '/headerOrder',
    data: JSON.stringify(this.school),
    success: function(prevHeads) {
      requested.forEach(function(req) {
        var previousHeaderString = prevHeads[req];
        for (var i = 0; i < available.length; i++) {
          if (available[i] !== previousHeaderString) continue;
          _this.setHeader(req, available[i]);
          break;
        }

        if (ii === fields.length) matched[req] = void 0;
      });

      this.emit('header-updated', this);
    }.bind(this)
  });

}

StatefulFields.prototype = Object.create(EE.prototype);
StatefulFields.prototype.constructor = StatefulFields;

StatefulFields.prototype.setHeader = function(requiredKey, availableKey) {
  var matched = Object.keys(this.matched);
  if (this.matched[required]) {
    this.available.push(this.matched[required]);
  }

  this.matched[required] = availableKey;
  this.available.splice(this.available.indexOf(availableKey), 1);
};

StatefulFields.prototype.confirmHeaders = function() {

  this.matched.School = this.school.School;

  var schoolNames;

  var numCalls = 0;
  var isReady = (function() {
    numCalls++;
    if (numCalls < 2) return;
    this.emit('ready-for-fuzzy', this);
  }).bind(this);

  $.ajax({
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),
    url: '/updateHeaderOrder',
    success: function(data) {
      console.log('called dataparser');
      isReady();
    }
  });

  delete this.matched.School;

  this.data = Categories[type].parser(this.rawData, this.matched);

  var names = data.map(function(individual) {
    return individual.Characteristics.Undergrad;
  });

  var payload = {names: names};
  $.ajax({
    url: '/checkschools',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(payload),
    complete: function(jqXHR, textStatus) {},

    success: function(data, textStatus, jqXHR) {
      // newNames is coming back
      // { got: [poss1, poss2] }
      this.possible = data;
      isReady();
    }.bind(this),

    error: function(jqXHR, textStatus, errorThrown) {
      // error callback
    }

  });

};

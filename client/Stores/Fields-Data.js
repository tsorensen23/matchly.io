var EE = require('events').EventEmitter;

var Categories = require('./Categories.js');

var ee = new EE();

module.exports = ee;

ee.createStore = function(type, data, school) {
  this.emit('new-Store', new StatefulFields(type, data, school));
};

function StatefulFields(type, data, school) {
  EE.call(this);
  this.type = type;
  console.log(type);
  data = Papa.parse(data, {header:true});

  this.rawData = data.data;

  this.school = school;

  var requested = Categories[this.type].requested;
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

        if (i === available.length) {
          matched[req] = void 0;
        }
      });

      this.emit('ready-for-header', this);
    }.bind(this)
  });

}

StatefulFields.prototype = Object.create(EE.prototype);
StatefulFields.prototype.constructor = StatefulFields;

StatefulFields.prototype.getRealHeaders = function() {
  return Categories[this.type].realHeaders;
};

StatefulFields.prototype.setHeader = function(requiredKey, availableKey) {
  var matched = Object.keys(this.matched);
  if (this.matched[requiredKey]) {
    this.available.push(this.matched[requiredKey]);
  }

  this.matched[requiredKey] = availableKey;
  this.available.splice(this.available.indexOf(availableKey), 1);
};

StatefulFields.prototype.getRequired = function() {
  return Categories[this.type].requested;
};

StatefulFields.prototype.confirmHeaders = function() {
  this.emit('please-wait', this);

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
    url: '/updateHeaderOrder',
    data: JSON.stringify(this.matched),
    success: function(data) {
      console.log('called dataparser');
      isReady();
    }
  });

  delete this.matched.School;

  this.data = Categories[this.type].parser(this.rawData, this.matched);

  var names = this.data.map(function(individual) {
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

StatefulFields.prototype.doneWithSchool = function(alias, trueName) {
  var dataArray = this.data;
  dataArray.forEach(function(element) {
    if (element.Characteristics.Undergrad === alias) {
      element.Characteristics.Undergrad = trueName;
    }
  });

  var possible = this.possible;
  possible.splice(possible.indexOf(alias), 1);
  this.emit('ready-for-fuzzy', this);
};

StatefulFields.prototype.finish = function() {
  $.ajax({
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(this.data),
    url: Catagories[this.type].url,
    success: function(data) {
      this.emit('finished', this);
    }.bind(this)
  });
};

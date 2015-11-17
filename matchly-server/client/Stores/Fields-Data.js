var EE = require('events').EventEmitter;

var async = require('async');
var mpath = require('mpath');
var Categories = require('./Categories.js');

var ee = new EE();

module.exports = ee;

ee.createStore = function(type, data, fields, school) {
  this.emit('new-Store', new StatefulFields(type, data, fields, school));
};

function StatefulFields(type, data, fields, school) {
  EE.call(this);
  this.type = type;
  this.setMaxListeners(0);

  this.rawData = data;

  this.school = school;

  var requested = Categories[this.type].requested;
  var matched = this.matched = {};
  var available = this.available = fields;

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
          if (available[i] !== previousHeaderString) {
            continue;
          }

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

StatefulFields.prototype.getStaticKeys = function() {
  return Categories[this.type].staticKeys;
};

StatefulFields.prototype.confirmHeaders = function() {
  // this.emit('please-wait', this);

  this.data = Categories[this.type].parser(this.rawData, this.matched);
  var individuals = {};
  var individualsEmployers = {};

  var schoolAliases = this.data.map(function(individual) {
    individuals[individual.Characteristics.Undergrad] = `${individual.Contact.First} ${individual.Contact.Last}`;
    return individual.Characteristics.Undergrad;
  });
  var employerAliases = this.data.map(function(individual) {
    individualsEmployers[individual.Characteristics.Employer] = `${individual.Contact.First} ${individual.Contact.Last}`;
    return individual.Characteristics.Employer;
  });
  async.parallel([
    function(next) {

      var payload = JSON.parse(JSON.stringify(this.matched));
      payload.School = this.school.School;
      $.ajax({
        method: 'POST',
        contentType: 'application/json',
        url: '/updateHeaderOrder',
        data: JSON.stringify(payload),
        success: function(data) {
          next();
        },

        error: function(jqXHR, textStatus, errorThrown) {
          next(errorThrown);
        }
      });

    }.bind(this),
    function(next) {
      var schoolNames;

      delete this.matched.School;
      $.ajax({
        url: '/checkschools',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({names: schoolAliases}),
        complete: function(jqXHR, textStatus) {},

        success: function(data, textStatus, jqXHR) {
          // newNames is coming back
          // { got: [poss1, poss2] }
          this.possibleSchools = data;
          this.individuals = individuals;
          next();
        }.bind(this),

        error: function(jqXHR, textStatus, errorThrown) {
          next(errorThrown);
        }

      });
    }.bind(this),
    function(next) {
      var storage = localStorage.getItem('schools');
      if (storage){
        this.availableSchools = storage.split(',');
        next();
      } else {
        $.ajax({
          url: '/schools',
          type: 'get',
          dataType: 'json',
          complete: function(jqXHR, textStatus) {
            // callback
          },

          success: function(data, textStatus, jqXHR) {
            this.availableSchools = data;
            localStorage.setItem('schools', data);
            next();
          }.bind(this),
          error: function(jqXHR, textStatus, errorThrown) {
            // TODO sam implemen a real endpoint that saves and logs client side errors
            console.warn('There was an error', errorThrown);
            next(errorThrown);
          }
        });
      }
    }.bind(this),
      function(next) {
        $.ajax({
          url: 'checkemployers',
          type: 'POST',
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify({employers: employerAliases}),
          complete: function (jqXHR, textStatus) {
            // callback
          },
          success: function (data, textStatus, jqXHR) {
            this.possibleEmployers = data;
            this.individualsEmployers = individualsEmployers;
            next();
            // success callback
          }.bind(this),
          error: function (jqXHR, textStatus, errorThrown) {
            console.warn('There was an error', errorThrown);
            console.error(textStatus);
            next(errorThrown);
            // error callback
          }
        });
      }.bind(this),
    function(next) {
      $.ajax({
        url: '/employers/',
        type: 'GET',
        dataType: 'json',
        complete: function (jqXHR, textStatus) {
        },
        success: function (data, textStatus, jqXHR) {
          this.availableEmployers = data;
          next();
        }.bind(this),
        error: function (jqXHR, textStatus, errorThrown) {
            console.warn('There was an error', errorThrown);
            next(errorThrown);
        }
      });
    }.bind(this)

  ], function(err) {
    if (err) throw err;
    this.emit('set-headers');
  }.bind(this));

};

StatefulFields.prototype.doneWithSchool = function(alias, trueName) {
  // this.emit('please-wait', this);
  if(!alias || !trueName){
    console.error('doneWithSchool called with too few arguments');
    return void 0;
  }

  $.ajax({
    url: 'schoolmatch',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({ alias: alias, school: trueName}),
    complete: function(jqXHR, textStatus) {
      // callback
    },

    success: function(data, textStatus, jqXHR) {
      this.possibleSchools[alias] = trueName;
      // this.emit('ready-for-fuzzy', this);

      // success callback
    }.bind(this),

    error: function(jqXHR, textStatus, errorThrown) {
      console.error(errorThrown);

      // error callback
    }
  });

  this.data = this.data.map(function(element) {
    if (element.Characteristics.Undergrad === alias) {
      element.Characteristics.Undergrad = trueName;
    }
    return element;
  });
  this.rawData = this.rawData.map(function(element){
    if (element[this.matched.Undergrad] === alias){
      element[this.matched.Undergrad] = trueName;
    }
    return element;
  }.bind(this));
};

StatefulFields.prototype.resetSchool = function(alias) {
  this.possibleSchools[alias] = null;
  this.emit('ready-for-fuzzy', this);
};

StatefulFields.prototype.finishFuzzySchools = function() {
  // this.emit('ready-for-employer-fuzzy');
};

StatefulFields.prototype.finishFuzzyEmployers = function() {
  this.emit('ready-for-confirmation');
};

StatefulFields.prototype.finishFuzzy = function() {
  this.emit('ready-for-confirmation', this);
};

StatefulFields.prototype.finish = function(statics) {
  this.emit('please-wait', this);
  this.data.forEach(function(item) {
    for (var i in statics) {
      mpath.set(i, statics[i], item);
    }
  });
  $.ajax({
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(this.data),
    url: Categories[this.type].url,
    success: function(data) {
      this.emit('finished', this);
    }.bind(this)
  });
};
StatefulFields.prototype.doneWithEmployer = function(alias, trueName) {
  var dataArray = this.data;
  var possible = this.possibleEmployers;
  this.emit('please-wait', this);
  if(!alias || !trueName){
    console.error('doneWithSchool called with too few arguments');
    return void 0;
  }

  $.ajax({
    url: 'employermatch',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({ alias: alias, school: trueName}),
    success: function(data, textStatus, jqXHR) {
      possible[alias] = trueName;
      this.emit('ready-for-employer-fuzzy', this);
      // success callback
    }.bind(this),

    error: function(jqXHR, textStatus, errorThrown) {
      console.error(errorThrown);

      // error callback
    }
  });

  this.data = dataArray.map(function(element) {
    if (element.Characteristics.Employer === alias) {
      element.Characteristics.Employer = trueName;
    }
    return element;
  });
};

StatefulFields.prototype.resetSchool = function(alias) {
  this.possibleSchools[alias] = null;
  this.emit('ready-for-fuzzy', this);
};

StatefulFields.prototype.resetEmployer = function(alias) {
  this.possibleEmployers[alias] = null;
  this.emit('ready-for-employer-fuzzy', this);
};

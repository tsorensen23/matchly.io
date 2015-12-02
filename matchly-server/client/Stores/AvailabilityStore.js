var events = require('events');
var mpath = require('mpath');
var SECTIONS = ['A','B','C','D','E'];
var TIMES = ['8:00','10:00','11:45'];
class myEE extends events.EventEmitter {
  constructor() {
    super()
    $.ajax({
      method: 'GET',
      url: '/getAvailableData',
      success: function(data) {
        this.availableData =  data[0];
        this._id = data[0]._id;
        this.emit('update state', data[0])
      }.bind(this)
    });
  } 
  setValue(key, value) {
    this.availableData[key].availableSpots = value;
    this.emit('update state', this.availableData);
  }
  postData() {
    var dataObject = {};
    dataObject.id = this._id;
    for (var i = 0, l = SECTIONS.length; i < l; i++) {
      for (var ii = 0, ll = TIMES.length; ii < ll; ii++) {
        var cur = SECTIONS[i] + (ii + 1);
        var spots =  this.getValue(cur + '.availableSpots');
        dataObject[cur] = {
          availableSpots: spots,
          lowestIndex: null,
          matches: {
            exists: 'yes'
          }
        };
      }
    }
    $.ajax({
      url: 'availability',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(dataObject),
      complete: function (jqXHR, textStatus) {
        // callback
      },
      success: function (data, textStatus, jqXHR) {
        this.emit('finished');

      }.bind(this),
      error: function (jqXHR, textStatus, errorThrown) {
        console.error(errorThrown)
        // error callback
      }
    });
  
  }
  getValue(key) {
    return mpath.get(key, this.availableData)
  }
}

module.exports = myEE;

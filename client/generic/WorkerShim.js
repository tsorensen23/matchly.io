var EE = require('events').EventEmitter;

module.exports = function(worker) {
  var ret = new EE();
  var self = new EE();


  ret.addEventListener = ret.on;
  self.addEventListener = self.on;

  self.location = window.location;

  ret.postMessage = function(message) {
    self.emit('message', {data:message});
  };

  self.postMessage = function(message) {
    ret.emit('message', {data:message});
  };

  process.nextTick(worker.bind(self, self));
  return ret;
};

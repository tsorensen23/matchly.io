var Baby = require('babyparse');
module.exports = function(name, data) {
  var a = document.createElement('a');
  a.href = 'data:application/csv;charset=utf-8,' + encodeURIComponent(Baby.unparse(data));
  a.target = '_blank';
  a.download = name + '.csv';
  document.body.appendChild(a);
  a.click();
};

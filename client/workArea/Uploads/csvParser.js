var path = require('path');
var url = require('url');
module.exports = function(self) {
  console.log(self.location.hostname);
  var host = url.parse(self.location.toString().substring(5));
  console.log(host.protocol + '//' + host.host + '/assets/papaparse.min.js');
  self.importScripts(host.protocol + '//' + host.host + '/assets/papaparse.min.js');
  self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/xlsx.core.min.js');

  var sheets;
  var possibleSheets;

  function setSheet(name) {
    var data = Papa.parse(
      XLSX.utils.sheet_to_csv(sheets[sheetname]),
      {header: true}
    );
    self.postMessage({
      possibleSheets:possibleSheets,
      fileData:data.data,
      fields: data.meta.fields
    });
  }

  self.addEventListener('message', function(ev) {
    if (ev.type === 'setSheet') return setSheet(ev.sheet)
    var filename = ev.data.filename;
    var data = ev.data.data;
    var ext = path.extname(filename);
    if (ext === '.csv') {
      sheets = null;
      data = Papa.parse(data, {header:true});
      return self.postMessage({
        possibleSheets: null,
        fileData:data.data,
        fields: data.meta.fields
      });
    }

    var workbook = XLSX.read(data, {type: 'binary'});
    sheets = workbook.Sheets;
    if (workbook.SheetNames.length === 1) {
      possibleSheets = null;
      return setSheet(workbook.SheetNames[0], null);
    }

    possibleSheets = workbook.SheetNames;
    self.postMessage({possibleSheets: possibleSheets});
  });
};

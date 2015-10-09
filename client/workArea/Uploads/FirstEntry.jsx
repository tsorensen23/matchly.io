var React = require('react');
var path = require('path');

var ReadableFile = require('../../generic/ReadableFile.jsx');
var insertGlobal = require('../../generic/insertGlobal');
insertGlobal('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/xlsx.core.min.js');
insertGlobal('/assets/papaparse.min.js');

var Upload = React.createClass({
  getInitialState: function() {
    return {
      possibleSheets: null,
      fileData: null,
      hostOrVisitor: null
    };
  },

  fileupload: function(event) {
    event.preventDefault();
    this.props.Store.createStore(
      this.state.hostOrVisitor,
      this.state.fileData,
      this.state.fields,
      {School: 'Darden'}
    );
  },

  browserSupportFileUpload: function() {
    var isCompatible = false;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      isCompatible = true;
    }

    return isCompatible;
  },

  setHostVisitor: function(e) {
    this.setState({hostOrVisitor:e.target.value});
  },

  setSheet: function(sheetname) {
    var data = Papa.parse(
      XLSX.utils.sheet_to_csv(this.state.sheets[sheetname]),
      {header: true}
    );
    this.setState({
      fileData:data,
      fields: data.meta.fields
    });
  },

  setHasFile: function(e) {
    if (!e.hasFile()) return this.setState({fileData: null});
    this.refs.readableFile.read(function(err,data) {
      var ext = path.extname(this.refs.readableFile.getFileName());
      console.log(ext);
      if (ext === '.csv') {
        data = Papa.parse(data, {header:true});
        return this.setState({
          possibleSheets: null,
          fileData:data.data,
          fields: data.meta.fields
        });
      }

      var workbook = XLSX.read(data, {type: 'binary'});
      this.setState({sheets: workbook.Sheets});
      if (workbook.SheetNames.length === 1) {
        this.setState({possibleSheets: null});
        return this.setSheet(workbook.SheetNames[0]);
      }

      this.setState({possibleSheets: workbook.SheetNames});

    }.bind(this));
  },

  uploadDisabled: function() {
    return !(this.state.hostOrVisitor && this.state.fileData);
  },

  render: function() {
    return (
      <form id='file-form' onSubmit={this.fileupload}>
        <div id='dvImportSegments' className='fileupload' >
            <legend>Upload your CSV File</legend>
          <div id='radio-buttons'>
            <label>
              <input type='radio' name='hostOrVisitor' onClick={this.setHostVisitor} value='host' required /> Hosts
            </label>
            <br></br>
            <label>
              <input type='radio' name='hostOrVisitor' onClick={this.setHostVisitor} value='visitor' /> Visitors
            </label>
          </div>
          <hr />
          <ReadableFile accept='.xlsx, .xls, .csv' name='File Upload' onChange={this.setHasFile} ref='readableFile'/>
          <ul>{this.state.possibleSheets ? this.state.possibleSheets.map(function(sheet) {
            return <li><input type='radio' name='possibleSheet' onClick={this.setSheet.bind(this, sheet)} value={sheet} required /> {sheet} </li>;
          }.bind(this)) : null}</ul>
        </div>
        <input id='submitButton' type='submit' disabled={this.uploadDisabled()}></input>
      </form>
    );
  }
});

module.exports = Upload;

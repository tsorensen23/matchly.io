var React = require('react');
var path = require('path');

var ReadableFile = require('../../generic/ReadableFile.jsx');

var work = require('../../generic/WorkerShim');

var worker = work(require('./csvParser'));

var Upload = React.createClass({
  getInitialState: function() {
    return {
      possibleSheets: null,
      fileData: null,
      hostOrVisitor: null
    };
  },

  componentWillMount: function() {
    this.worker = worker;
    this.worker.addEventListener('message', function(ev) {
      this.setState(ev.data);
    }.bind(this));
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
    this.worker.sendMessage({event:'setSheet', sheet:sheetname});
  },

  setHasFile: function(e) {
    if (!e.hasFile()) return this.setState({fileData: null});
    this.refs.readableFile.read(function(err, data) {
      if (err) throw err;
      this.worker.postMessage({
        filename:this.refs.readableFile.getFileName(),
        data:data
      });

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

var React = require('react');

var ReadableFile = require('../generic/ReadableFile');

var CATEGORIES = require('../Stores/Categories');

var Upload = React.createClass({
  getInitialState: function() {
    return {
      hasFile: false,
      hostOrVisitor: null
    };
  },

  fileupload: function(event) {
    event.preventDefault();
    this.refs.readableFile.read(function(err,data) {
      if (err) return alert(err);

      this.props.currentStore.create(
        this.state.hostOrVisitor,
        data,
        {School: 'Darden'},
        CATEGORIES
      );

    });
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

  setHasFile: function(e) {
    this.setState({hasFile:e.hasFile()});
  },

  uploadDisabled: function() {
    return this.state.hostOrVisitor && this.state.hasFile;
  },

  render: function() {
    return (
      <form id='file-form' onSubmit={this.fileupload}>
        <div id='radio-buttons'>
          <input type='radio' name='hostOrVisitor' onClick={this.setHostVisitor} value='host' required> Hosts</input>
          <br></br>
          <input type='radio' name='hostOrVisitor' onClick={this.setHostVisitor} value='visitor'> Visitors</input>
        </div>
        <ReadableFile accept='.csv' name='File Upload' />
        <div id='dvImportSegments' class='fileupload '>
            <legend>Upload your CSV File</legend>
            <ReadableFile accept='.csv' name='File Upload' onChange={this.setHasFile} ref='readableFile'/>
        </div>
        <input id='submitButton' type='submit' disabled={this.uploadDisabled()}></input>
      </form>
    );
  }
});

module.exports = Upload;

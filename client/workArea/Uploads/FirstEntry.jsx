var React = require('react');

var ReadableFile = require('../../generic/ReadableFile.jsx');

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
      this.props.Store.createStore(
        this.state.hostOrVisitor,
        data,
        {School: 'Darden'}
      );

    }.bind(this));
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
            <ReadableFile accept='.csv' name='File Upload' onChange={this.setHasFile} ref='readableFile'/>
        </div>
        <input id='submitButton' type='submit' disabled={this.uploadDisabled()}></input>
      </form>
    );
  }
});

module.exports = Upload;

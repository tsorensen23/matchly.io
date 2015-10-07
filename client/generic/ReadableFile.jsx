
var React = require('react');

module.exports = React.createClass({

  read: function(next) {
    if (React.findDOMNode(this).files.length === 0) {
      return next(new Error('no file selected'));
    }

    var data = React.findDOMNode(this).files;
    var reader = new FileReader();
    reader.addEventListener('load', function(event) {
      next(void 0, event.target.result);
    }.bind(this));
    reader.readAsText(data[0]);
  },

  hasFile: function() {
    return React.findDOMNode(this).files.length > 0;
  },

  getFileData: function() {
    if (this.props.onChange) this.props.onChange(this);
  },

  render: function() {
    return (<input type='file' name={this.props.name} onChange={this.changed} accept={this.props.accept} />);
  }
});

var React = require('react');

var EditableTableView = require('../../generic/EditableTableView.jsx');
var UnknownInput = require('../../generic/UnknownInput.jsx');


var VisitorInformation = React.createClass({
  getInitialState: function() {
    return {
      opacity: 1
    };
  },

  submitData: function() {
    var statics = {};
    this.props.store.getStaticKeys().forEach(function(value) {
      statics[value.path] = this.refs[value.path].getValue();
    }.bind(this));
    this.props.store.finish(statics);
  },

  captialize: function(name) {
    return this.props.store.type.charAt(0).toUpperCase() +
      this.props.store.type.substring(1);
  },

  render: function() {
    var opacity = this.state.opacity || '0.9';

    return (
      <div>
        <h2>{} Information</h2>
        <div>{this.props.store.getStaticKeys().map(function(sValue) {
          return <div>{sValue.label}: <UnknownInput type={sValue.type} ref={sValue.path} /></div>;
        })}</div>

        <div id='array-of-individuals'>
          <EditableTableView headers={this.props.store.getRealHeaders()} items={this.props.store.data} />
        </div>
        <input id='confirm-button' type='button' value='Confirm Data' onClick={this.submitData}></input>
      </div>
    );
  }
});

module.exports = VisitorInformation;

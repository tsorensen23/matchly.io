var React = require('react');

var EditableTableView = require('../../generic/EditableTableView.jsx');

var VisitorInformation = React.createClass({

  submitData: function() {
    this.props.store.finish();
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
        <div id='array-of-individuals'>
          <EditableTableView headers={this.props.store.realHeaders()} items={this.props.store.data} />
        </div>
        <input id='confirm-button' type='button' value='Confirm Data' onClick={this.submitData}></input>
      </div>
    );
  }
});

module.exports = VisitorInformation;

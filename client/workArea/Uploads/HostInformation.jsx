var React = require('react');
var visitorHeaders = [
  'Contact.First',
  'Contact.Last',
  'MatchInfo.Class Visit Time',
  'Characteristics.Military',
  'Characteristics.Country',
  'Characteristics.Citizenship',
  'Characteristics.Undergrad',
  'Characteristics.Employer',
  'Characteristics.Industry',
  'Characteristics.City',
  'Characteristics.State'
];

var EditableTableView = require('../../generic/EditableTableView.jsx');

var VisitorInformation = React.createClass({
  getInitialState: function() {
    return {dataArray: this.props.initialDataArray};
  },

  submitData: function() {
    $.ajax({
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(this.state.dataArray),
      url: '/submitvisitors',
      success: function(data) {
        alert('Success!');
      }.bind(this)
    });
  },

  render: function() {
    var opacity = this.state.opacity || '0.9';
    return (
      <div>
        <h2>Host Information</h2>
        <div id='array-of-individuals'>{this.state.dataArray.map(function(element) {
          return (<ParsedDataHosts data={element} />);
        })}</div>
        <input id='confirm-button' type='button' value='Confirm Data' onClick={this.submitData}></input>
      </div>
    );
  }
});

module.exports = VisitorInformation;


var React = require('react');
var DatePicker = require('react-datepicker');
var moment = require('moment');

module.exports = React.createClass({
  getInitialState: function() {
    return {value:this.props.value};
  },

  handleChange: function(v) {
    var digested;
    switch (this.props.type.toLowerCase()) {
      case 'date': digested = moment(v).toString(); break;
      default: digested = v;
    }

    this.setState({value:v, digested: digested});
  },

  getValue: function() {
    return this.state.digested;
  },

  render: function() {
    switch (this.props.type.toLowerCase()) {
      case 'date':
        return <DatePicker selected={this.state.value} onChange={this.handleChange} />;
    }
  }
});

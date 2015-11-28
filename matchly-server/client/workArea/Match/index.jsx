var React = require('react');
var DatePicker = require('react-datepicker');
var Match = require('./Match.jsx');

var CrudStore = require('../../Stores/CrudStore');

var VisitorStore = CrudStore('visitors');
var HostStore = CrudStore('hosts');

var MatchIndex = React.createClass({
  getInitialState: function() {
    return {
      date: void 0
    };
  },

  componentWillMount: function() {
  },

  handleChange: function(date) {
    this.setState({date:date});
  },

  render:function() {
    var display = [<DatePicker selected={this.state.date} onChange={this.handleChange} />];
    if (this.state.date) {
      var matches = (<Match date={this.state.date} />);
    }

    return (
        <div>

          <h2> Select a date that you would like to match on </h2>
          {display}
          {matches}
      </div>
    );
  }
});

module.exports = MatchIndex;

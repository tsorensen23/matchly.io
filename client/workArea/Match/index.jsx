var React = require('react');
var DatePicker = require('react-datepicker');
var Match = require('./Match.jsx');

var CrudStore = require('../../Stores/CrudStore');

var VisitorStore = CrudStore('visitors');
var HostStore = CrudStore('hosts');

var MatchIndex = React.createClass({
  getInitialState: function() {
    return {
      date: void 0,
      hosts: void 0,
      visitors: void 0
    };
  },

  handleChange: function(date) {
    var _this = this;
    HostStore.getAll({}, function(err, hosts) {
      if (err) return console.error(err);
      VisitorStore.getAll({'MatchInfo.visitDate': date.toString()}, function(err, visitors) {
        _this.setState({date:date, visitors: visitors, hosts: hosts});
      });
    });
  },

  render:function() {
    var display = [<DatePicker selected={this.state.date} onChange={this.handleChange} />];
    if (this.state.date) {
      display.push(<Match
        date={this.state.date}
        hosts={this.state.hosts}
        visitors={this.state.visitors}
      />);
    }

    return (
        <div>

          <h2> Select a date that you would like to match on </h2>
          {display}
      </div>
    );
  }
});

module.exports = MatchIndex;

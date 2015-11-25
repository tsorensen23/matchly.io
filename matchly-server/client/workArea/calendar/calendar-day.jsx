var React = require('react');

var CalendarDay = React.createClass({
  getInitialState: function() {
    return {day: 1}
  },
  add: function() {
    this.setState({
      day: 2
    });
  },
  render:function() {
    return (
      <div onClick={this.add}>
        {this.state.day}
      </div>
    );
  }
});

module.exports = CalendarDay;

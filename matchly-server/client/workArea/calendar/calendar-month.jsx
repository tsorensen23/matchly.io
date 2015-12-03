var React = require('react');
var CalendarDay = require('./calendar-day.jsx');
var Link = require('react-router').Link;


var CalendarMonth = React.createClass({
  render:function() {
    var calendarDays = [];
    for (var i = 0; i < this.props.calendar.length; i++) {
      calendarDays.push(<CalendarDay key={this.props.calendar[i].date} date={this.props.calendar[i].date} uploaded={this.props.calendar[i].uploaded} matched={this.props.calendar[i].matched} />);
    }
    return (
      <div className="row">
        {calendarDays}
      </div>
    );
  }
});

module.exports = CalendarMonth;

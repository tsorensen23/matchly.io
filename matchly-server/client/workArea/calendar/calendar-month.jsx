var React = require('react');
var CalendarDay = require('./calendar-day.jsx');


var CalendarMonth = React.createClass({
  render:function() {
    return (
      <div>
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
        <CalendarDay />
      </div>
    );
  }
});

module.exports = CalendarMonth;

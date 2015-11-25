var React = require('react');
var CalendarDay = require('./calendar-day.jsx');
var Link = require('react-router').Link;


var CalendarMonth = React.createClass({
  render:function() {
    var data = [{
      date: '1',
      uploaded: false,
      matched: false
    },
    {
      date: '2',
      uploaded: true,
      matched: false
    },
    {
      date: '3',
      uploaded: false,
      matched: false
    },
    {
      date: '4',
      uploaded: false,
      matched: true
    }];
    var calendarDays = [];
    for (var i = 0; i < data.length; i++) {
      calendarDays.push(<CalendarDay date={data[i].date} uploaded={data[i].uploaded} matched={data[i].matched} />);
    }
    return (
      <div>
        {calendarDays}
      </div>
    );
  }
});

module.exports = CalendarMonth;

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
    },
    {
      date: '5',
      uploaded: true,
      matched: false
    },
    {
      date: '6',
      uploaded: false,
      matched: false
    },
    {
      date: '7',
      uploaded: false,
      matched: false
    },
    {
      date: '8',
      uploaded: true,
      matched: false
    },
    {
      date: '9',
      uploaded: false,
      matched: true
    },
    {
      date: '10',
      uploaded: false,
      matched: false
    },
    {
      date: '11',
      uploaded: false,
      matched: true
    },
    {
      date: '12',
      uploaded: true,
      matched: false
    },
    {
      date: '13',
      uploaded: false,
      matched: false
    },
    {
      date: '14',
      uploaded: false,
      matched: true
    }];
    var calendarDays = [];
    for (var i = 0; i < this.props.calendar.length; i++) {
      calendarDays.push(<CalendarDay key={this.props.calendar[i].date} date={this.props.calendar[i].date} uploaded={this.props.calendar[i].uploaded} matched={this.props.calendar[i].matched} />);
    }
    console.log(this.props);
    return (
      <div className="row">
        {calendarDays}
      </div>
    );
  }
});

module.exports = CalendarMonth;

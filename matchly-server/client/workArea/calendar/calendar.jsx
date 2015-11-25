var React = require('react');
var CalendarMonth = require('./calendar-month.jsx')
var CalendarList = require('./calendar-list.jsx');

var Calendar = React.createClass({
  render:function() {
    return (
      <div>
        <CalendarMonth />
        <CalendarList />
      </div>
    );
  }
});

module.exports = Calendar;

var React = require('react');
var CalendarMonth = require('./calendar-month.jsx')
var CalendarList = require('./calendar-list.jsx');

var styles = {
  fullView: {
    margin: '20px 0'
  },
  calendarView: {
    width: '85%',
    float: 'left',
    display: 'block'
  },
  calendarList: {
    width: '15%',
    float: 'left',
    display: 'block'
  }
};

var Calendar = React.createClass({
  render:function() {
    return (
      <div style={styles.fullView}>
        <div style={styles.calendarView}>
          <CalendarMonth />
        </div>
        <div style={styles.calendarList}>
          <CalendarList />
        </div>
      </div>
    );
  }
});

module.exports = Calendar;

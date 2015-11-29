var React = require('react');
import CalendarListItem from './calendar-list-item';

var CalendarList = React.createClass({
  render:function() {
    return (
      <div>
        <ul>
        {this.props.calendar.map(datapoint =>
            (<CalendarListItem calendarEntry={datapoint} />)
          )}
        </ul>
      </div>
    );
  }
});

module.exports = CalendarList;

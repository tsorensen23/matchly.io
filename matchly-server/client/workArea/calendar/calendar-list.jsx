var React = require('react');
import CalendarListItem from './calendar-list-item';

var CalendarList = React.createClass({
  render:function() {
    return (
      <div>
        <ul>
        {this.props.calendar.filter(datapoint => 
            datapoint.uploaded || datapoint.matched
         ).map(datapoint =>
            (<CalendarListItem key={datapoint.date} calendarEntry={datapoint} />)
         )}
        </ul>
      </div>
    );
  }
});

module.exports = CalendarList;

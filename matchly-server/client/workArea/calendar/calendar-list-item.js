import React from 'react';
import moment from 'moment';
export default React.createClass({
  render: function(){
    var calendarEntry = this.props.calendarEntry;
    return (
      <li>
        {moment(calendarEntry.date).format('MM-DD')}
        {() =>
          calendarEntry.matched ? 'Matched' : ''
        }
        {() =>
          calendarEntry.uploaded ? 'Uploaded' : ''
        }
      </li>
      );
  }
})

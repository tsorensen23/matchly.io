import React from 'react';
import moment from 'moment';
export default React.createClass({
  render: function(){
    var calendarEntry = this.props.calendarEntry;
    return (
      <li style={{marginLeft: '20'}}>
        {moment(calendarEntry.date).format('MMM Do' + ', ' + 'YYYY')}
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

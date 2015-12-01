import React from 'react';
import moment from 'moment';
export default React.createClass({
  render: function(){
    var calendarEntry = this.props.calendarEntry;
    var date = moment(calendarEntry.date).format('MMM Do' + ', ' + 'YYYY');
    var matched = calendarEntry.matched ? ': Matched' : '';
    var uploaded = calendarEntry.uploaded ? ' :Uploaded' : '';
      return (
      <li style={{marginLeft: '10'}}>
      {`${date}${matched} ${uploaded}`}
      </li>
      );
  }
});

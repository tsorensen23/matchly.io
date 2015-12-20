import React from 'react';
import moment from 'moment';
import {Link} from 'react-router'
export default React.createClass({
  render: function(){
    var calendarEntry = this.props.calendarEntry;
    var date = moment(calendarEntry.date).format('MMM Do' + ', ' + 'YYYY');
    var matched = calendarEntry.matched ? ': Matched' : '';
    var uploaded = calendarEntry.uploaded ? ' :Uploaded' : '';
      return (
      <li style={{marginLeft: '10'}}>
        <Link
          to='/match'
          query={{date: calendarEntry.date}}
          className="has-data"
          style={{
            textDecoration: 'underline'
          }}
        >
          {`${date}${matched} ${uploaded}`}
        </Link>
      </li>
      );
  }
});

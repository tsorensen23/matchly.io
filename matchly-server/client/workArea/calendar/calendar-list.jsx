var React = require('react');

var CalendarList = React.createClass({
  render:function() {
    return (
      <div>
        <ul>
          <li>
            Wed, 11/25/15
          </li>
          <li>
            Fri, 11/27/15
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = CalendarList;

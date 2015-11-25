var React = require('react');

var CalendarList = React.createClass({
  render:function() {
    return (
      <div>
        <ul>
          <li>
            Wednesday, November 25, 2015
          </li>
          <li>
            Friday, November 27, 2015
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = CalendarList;

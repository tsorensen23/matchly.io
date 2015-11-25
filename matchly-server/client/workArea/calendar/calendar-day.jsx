var React = require('react');
var Link = require('react-router').Link;

var CalendarDay = React.createClass({

  render:function() {
    console.log(this.props);
    if (this.props.uploaded || this.props.matched) {
      return (
        <Link to='/upload'>
          {this.props.date}
        </Link>
      );
    } else {
      return (
        <div>
            {this.props.date}
        </div>
      );
    }
  }
});

module.exports = CalendarDay;

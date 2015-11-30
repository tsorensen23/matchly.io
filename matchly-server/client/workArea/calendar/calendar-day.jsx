var React = require('react');
var Link = require('react-router').Link;

var styles = {
  day: {
    width: '14%',
    fontSize: '18px',
    padding: '50px 0',
    border: '1px solid rgba(212,212,212,0.5)',
    display: 'inline-block',
    textAlign: 'center',
    verticalAlign: 'middle'
  },
  matched: {
    backgroundColor: 'green',
  },
  hasData: {
    backgroundColor: 'yellow'
  }
};

var CalendarDay = React.createClass({

  render:function() {
    if (this.props.uploaded) {
      return (
        <Link
          to='/match'
          query={{date: this.props.date}}
          style={Object.assign({}, styles.day, styles.hasData)}
        >
          {this.props.date}
        </Link>
      );
    } if (this.props.matched) {
      return (
        <Link
          to='/match'
          query={{date: this.props.date}}
          style={Object.assign({}, styles.day, styles.matched)}
        >
          {this.props.date}
        </Link>
      );
    } else {
      return (
          <Link
            to='/upload'
            query={{date: this.props.date}}
            style={styles.day}
            >
            {this.props.date}
            </Link>
      );
    }
  }
});

module.exports = CalendarDay;

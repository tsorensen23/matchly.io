var React = require('react');
var Link = require('react-router').Link;

var styles = {
  day: {
    width: '14.28%',
    fontSize: '24px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    padding: '40px 0',
    border: '1px solid rgba(212,212,212,0.5)',
    display: 'inline-block',
    textAlign: 'center',
    verticalAlign: 'middle',
    color: 'black'
  },
  matched: {
    backgroundColor: 'green',
    color: 'white'
  },
  hasData: {
    backgroundColor: 'yellow',
    color: 'grey'
  }
};

var CalendarDay = React.createClass({

  render:function() {
    if (this.props.uploaded) {
      return (
        <Link
          to='/match'
          query={{date: this.props.date}}
          className="has-data"
          style={Object.assign({}, styles.day, styles.hasData)}
        >
          {this.props.date.slice(8)}
        </Link>
      );
    } if (this.props.matched) {
      return (
        <Link
          to='/match'
          query={{date: this.props.date}}
          className="has-match"
          style={Object.assign({}, styles.day, styles.matched)}
        >
          {this.props.date.slice(8)}
        </Link>
      );
    } else {
      return (
          <Link
            to='/upload'
            query={{date: this.props.date}}
            style={styles.day}
            >
            {this.props.date.slice(8)}
            </Link>
      );
    }
  }
});

module.exports = CalendarDay;

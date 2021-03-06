var React = require('react');
import { Link } from 'react-router';
import moment from 'moment';

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
    color: 'rgb(66,66,66)'
  },
  matched: {
    backgroundColor: '#327D3C',
    color: 'white'
  },
  hasData: {
    backgroundColor: '#FFEB3B',
    color: 'rgb(66,66,66)'
  }
};

export default class CalendarDay extends  React.Component{
  render() {
    if (this.props.uploaded) {
      return (
        <Link
          to='/match'
          query={{date: this.props.date}}
          className="has-data"
          style={Object.assign({}, styles.day, styles.hasData)}
        >
          {moment(this.props.date).format('MMM DD')}
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
          {moment(this.props.date).format('MMM DD')}
        </Link>
      );
    } else {
      return (
          <Link
            to='/upload'
            query={{date: this.props.date}}
            style={styles.day}
            className="calendar-day"
            >
          {moment(this.props.date).format('MMM DD')}
            </Link>
      );
    }
  }
}

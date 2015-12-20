var React = require('react');
var CalendarMonth = require('./calendar-month.jsx');

var CalendarList = require('./calendar-list.jsx');
var moment = require('moment');
var Loading = require('../Loading.jsx');
import { connect } from 'react-redux';
import * as actions from './actions';

var Calendar = React.createClass({
  componentDidMount: function(){
    var startDate = moment().startOf('week').add(1, 'day').format();
    var endDate = moment().startOf('week').add(4,'weeks').add(1, 'day').format();
    this.props.dispatch(actions.setStartEndDate(startDate, endDate));
    this.props.dispatch(actions.getCalendar());
  },
  render: function() {
    var {calendar} = this.props;
    if(calendar.isFetching){
      return (<Loading/>);
    }
      if(calendar.data.length > 0){
      return (
        <div style={{margin: '20px 0'}} className="calendar-view">
          <div
            className="col-xs-10"
            style={{
              border: '1px solid #ccc',
              overflow: 'hidden'
            }}
          >
            <CalendarMonth
              calendar={calendar.data}
            />
          </div>
          <div className="col-xs-2">
            <CalendarList
              calendar={calendar.data}
            />
          </div>
        </div>
      );
    }
    return (<Loading/>);
  }
});

module.exports = connect(function(state){
  return {
    calendar: state.calendar
  };
})(Calendar);

var React = require('react');
var CalendarMonth = require('./calendar-month.jsx');
var CalendarList = require('./calendar-list.jsx');
var moment = require('moment');
var Loading = require('../Loading.jsx');

var Calendar = React.createClass({
  getInitialState: function() {
    var startDate = moment().startOf("month");
    var endDate = moment().endOf("month");
    return {
      calendar: { isFetching: true, error: '', data: [] },
      startDate: startDate,
      endDate: endDate
    };
  },
  componentDidMount: function(){
    this.setState({calendar: { isFetching: true}});
    $.ajax({
      method: 'get',
      url: '/calendar',
      data: { startDate: this.state.startDate.toISOString(), endDate: this.state.endDate.toISOString()},
      complete: () => {
        this.setState({calendar: {isFetching: false}});
      },
      success: (data) => {
        this.setState({calendar: { data: data }});
      },
      error: (err) => {
        this.setState({calendar: {err: err}});
      }
    });
  },
  render: function() {
    if(this.state.calendar.isFetching){
      return (<Loading/>);
    }
    if(this.state.calendar.data.length > 0){
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
            calendar={this.state.calendar.data}
          />
        </div>
        <div className="col-xs-2">
          <CalendarList
            calendar={this.state.calendar.data}
          />
        </div>
      </div>
    );
    }
    return (<Loading/>);
  }
});

module.exports = Calendar;

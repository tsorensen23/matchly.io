var React = require('react');
var CalendarMonth = require('./calendar-month.jsx');
var CalendarList = require('./calendar-list.jsx');
var moment = require('moment');

var styles = {
  fullView: {
    margin: '20px 0'
  },
  calendarView: {
    width: '85%',
    float: 'left',
    display: 'block'
  },
  calendarList: {
    width: '15%',
    float: 'left',
    display: 'block'
  }
};

var Calendar = React.createClass({
  getInitialState: function() {
    var startDate = moment().startOf("month");
    var endDate = moment().endOf("month");
    console.log(endDate);
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
      return <h1>Loading</h1>;
    }
    return (
      <div style={styles.fullView}>
        <div style={styles.calendarView}>
          <CalendarMonth calendar={this.state.calendar.data} />
        </div>
        <div style={styles.calendarList}>
          <CalendarList calendar={this.state.calendar.data}/>
        </div>
      </div>
    );
  }
});

module.exports = Calendar;

var React = require('react');
var DatePicker = require('react-datepicker');
var Match = require('./Match.jsx');
var moment = require('moment');
var CrudStore = require('../../Stores/CrudStore');

var VisitorStore = CrudStore('visitors');
var HostStore = CrudStore('hosts');

var MatchIndex = React.createClass({
  getInitialState: function() {
    return {
      date: moment(this.props.location.query.date)
    };
  },

  componentWillMount: function() {
  },

  handleChange: function(date) {
    this.setState({date:date});
  },

  render:function() {
    if (this.state.date) {
      var matches = (<Match location={this.props.location} history={this.props.history}  date={this.state.date} />);
    }

    return (
        <div className="col-xs-10 col-xs-offset-1">
          <h3>Matching for {moment(this.state.date).format('MM/DD')}</h3>
          {matches}
      </div>
    );
  }
});

module.exports = MatchIndex;

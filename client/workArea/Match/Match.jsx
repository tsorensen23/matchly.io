var React = require('react');
var Visitor = require('../Visitors.jsx');
var Loading = require('../Loading.jsx');
var ProgressButton = require('react-progress-button');

var exportToCSV = require('../../generic/exportCSV.js');

var HostChooser = require('../DateException/HostChooser');

var Match = React.createClass({
  getInitialState: function() {
    return {matchData:null};
  },

  match:function() {
    // console.log(this.props,'props');
    var _this = this;

    // this.props
    this.refs.button.loading();
    $.ajax({
      method: 'GET',
      url: '/match/?date=' + this.props.date,
      success: function(data) {
        // console.log(_this, '_this');
        _this.setState({ matchData: data});
        if (data.array.length === 1) {
          alert('There were no visitors found!');
          _this.refs.button.error();
        } else {
          _this.refs.button.success();
        }
      },

      error: function(resp) {
        _this.refs.button.error();
      }
    });
  },

  exportToCSV:function() {
    exportToCSV('match-data', this.state.matchData.csv);
  },

  render:function() {
    var data = [];
    if (this.state.matchData) {
      // console.log('if statement fires');
      // console.log(this.state.matchData.array,'matchData');
      this.state.matchData.array.shift();
      data = this.state.matchData.array.map(function(visitor) {
        return (<Visitor visitor={visitor} />);
      });
    }

    return (
      <div>
        <div id='workArea'>
          <div id='list-of-visitors'>

          </div>
          <div id='schedule'>

          </div>
          <HostChooser date={this.props.date} />
          <ProgressButton ref='button' onClick={this.match}>MATCH</ProgressButton>
          <button id='exportButton' onClick={this.exportToCSV}>Export Data to CSV File</button>
        </div>
        <div id='loading'>
        </div>
        <div id='data'>
          <table className='table table-condensed minorPadding'>
            <thead>
              <tr>
                <th>Visitor First Name</th>
                <th>Visitor Last Name</th>
                <th>Host First Name</th>
                <th>Host Last Name</th>
                <th>Host Email</th>
                <th>Section</th>
                <th>Visit Time</th>
                <th>MatchCount</th>
                <th>Gender</th>
                <th>State</th>
                <th>City</th>
                <th>Industry</th>
                <th>Employer</th>
                <th>Undergrad</th>
                <th>Citizenship</th>
                <th>Country</th>
                <th>Military</th>
              </tr>
            </thead>
            <tbody>
                {data}
            </tbody>
          </table>
        </div>
        </div>
    );
  }
});

module.exports = Match;

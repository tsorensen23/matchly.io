var React = require('react');
var Visitor = require('../Visitors.jsx');
var Loading = require('../Loading.jsx');
import {connect} from 'react-redux';
var ProgressButton = require('react-progress-button');
import UnmatchedVisitors from './unmatched-visitors';
var HostStore = require('../../Stores/CrudStore')('hosts');

var exportToCSV = require('../../generic/exportCSV.js');

var HostChooser = require('../DateException/HostChooser.jsx');
import * as actions from './actions';

var Match = React.createClass({
  getInitialState: function() {
    this.props.dispatch(actions.setDate(this.props.date));
    this.props.dispatch(actions.getAllHosts());
    this.props.getAllVisitors()
    return {matchData:null};
  },
  match: function (e) {
    e.preventDefault()
    this.refs.button.loading();
    this.props.getMatches();

    //TODO handle these cases
    //
    // _this.refs.button.error();
    // _this.refs.button.success();
    // this.props
    // alert(`Sorry you were missing ${data.lecture1Spots} spots in lecture 1, ${data.lecture2Spots} spots in lecture 2,and  ${data.lecture3Spots} in Lecture 4`);
    // _this.props.history.pushState(null, '/available', data);
  // }
  },

  exportToCSV:function() {
    exportToCSV('match-data', this.props.matches.data);
  },

  render:function() {
      var data = this.props.matches.data.sort((a, b) => {
        return a.visitorLastName > b.visitorLastName;
      }).map(function(visitor, index) {
        return (<Visitor key={visitor.visitorFirstName + visitor.visitorLastName + index} visitor={visitor} />);
      });
      if(this.props.hosts.data.length > 0){
          var hosts = <HostChooser 
                        date={this.props.date} 
                        toggleHost={(host, onOff) => {
                          console.log('in match', host);
                         this.props.dispatch(actions.toggleHost(host, onOff))
                        }} 
                      />
      }


    return (
        <div id='workArea'>
          {hosts}
          <UnmatchedVisitors 
            visitors={this.props.visitors}
            backtoCalendar={() =>{
              this.props.history.pushState(null, '/calendar');
            }}
            date={this.props.date} 
          />
          <ProgressButton 
            className="btn btn-primary" 
            ref='button' 
            onClick={this.match}
          >
            MATCH
          </ProgressButton>
          <div className="text-center" style={{marginTop: '15'}}>

            <button 
              className="btn btn-info" 
              onClick={this.exportToCSV}
            >
              Export Data to CSV File
            </button>
          </div>
        <div id='data'>
          <table className='table table-condensed'>
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
                <th>Citizenship</th>
                <th>City</th>
                <th>Employer</th>
                <th>Gender</th>
                <th>Industry</th>
                <th>Military</th>
                <th>State</th>
                <th>Undergrad</th>
                <th>Country</th>
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

module.exports =connect(function(state){
 return state;
})(Match);

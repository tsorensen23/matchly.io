var React = require('react');
var Visitor = require('../Visitors.jsx');
var Loading = require('../Loading.jsx');
import {connect} from 'react-redux';
var ProgressButton = require('react-progress-button');
import UnmatchedVisitors from './unmatched-visitors';
var Loading = require('../Loading.jsx');

var exportToCSV = require('../../generic/exportCSV.js');
import { updatePath } from 'redux-simple-router';

var HostChooser = require('../DateException/HostChooser.jsx');
import * as actions from './actions';

var Match = React.createClass({
  componentDidMount: function() {
    this.props.dispatch(actions.clearMatches());
    this.props.dispatch(actions.setDate(this.props.date));
    this.props.dispatch(actions.getAllHosts());
    this.props.getAllVisitors();
    if(this.props.matches.isFetching){
      this.refs.button.loading();
    }
    if(this.props.matches.lastUpdated !== 0){
      this.refs.button.success();
    }
  },
  match: function (e) {
    e.preventDefault();
    this.refs.button.loading();
    this.props.getMatches(this.refs.button.success);

    //TODO handle these cases
    //
    // _this.refs.button.error();
    // _this.refs.button.success();
    // this.props
    // alert(`Sorry you were missing ${data.lecture1Spots} spots in lecture 1, ${data.lecture2Spots} spots in lecture 2,and  ${data.lecture3Spots} in Lecture 4`);
    // _this.props.history.pushState(null, '/available', data);
  },

  exportToCSV:function() {
    console.log("props",this.props);
    this.props.matches.data.shift();
    exportToCSV('match-data', this.props.matches.data);
  },

  render:function() {
    let { hosts, matches, visitors, date } = this.props;
    if(hosts.isFetching || visitors.isFetching){
      return( <Loading />);
    }
    if(matches.data.length > 0 && date.isSame(matches.date, 'day')){
      console.log(date, '<DATE>');
      var data =
        matches.data.filter(match =>
          match.hostFirstName || match.hostLastName
        ).sort((a, b) => {
        return a.visitorLastName > b.visitorLastName;
      }).map(function(visitor, index) {
        return (<Visitor key={visitor.visitorFirstName + visitor.visitorLastName + index} visitor={visitor} />);
      });
      var dataHTML = (
        <div id='data' style={{}}>
          <table className='table table-condensed'>
            <thead>
              <tr>
                <th>Visitor</th>
                <th>Host</th>
                <th>Host Email</th>
                <th>Visit Info</th>
                <th>Score</th>
                <th>Citizen</th>
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
        )

    }
      if(hosts.data.length > 0){
          var hosthtml = <HostChooser
                        date={date}
                        toggleHost={(host, onOff) => {
                         this.props.dispatch(actions.toggleHost(host, onOff))
                        }}
                      />
      }
    return (
        <div>
          {hosthtml}
          <UnmatchedVisitors
            visitors={visitors}
            deleteVisitors={() =>
              this.props.dispatch(actions.deleteVisitors())
            }

            date={date}
          />
          <ProgressButton
            className="btn btn-primary"
            style={{clear: 'both'}}
            ref='button'
            onClick={this.match}
          >
            MATCH
          </ProgressButton>
          <div className="text-center" style={{marginTop: '15'}}>

            <button
              className="btn btn-info"
              style={{margin: '0 0 15px 0'}}
              onClick={this.exportToCSV}
              disabled={!this.props.matches.data.length>0}
            >
              Export Data to CSV File
            </button>
          </div>
          {dataHTML}
      </div>
    );
  }

});

module.exports =connect(function(state){
 return {hosts: state.hosts, visitors: state.visitors, matches: state.matches};
})(Match);

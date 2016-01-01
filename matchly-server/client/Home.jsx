var React = require('react');

// var alasql=require('alasql');

import { connect } from 'react-redux';
var Link = require('react-router').Link;
import { fetchHeaders, getAllSchools, getAllEmployers, checkAllSchoolsandEmployers } from './workArea/upload-redux/actions';
import DevTools from './home/devTools';

var Home = React.createClass({
  componentDidMount: function() {
    this.props.dispatch(fetchHeaders());
    this.props.dispatch(checkAllSchoolsandEmployers());
  },
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 navigation">
            <div className="col-xs-12 col-sm-5">
              <h1><a href="/">MATCHLY.IO</a></h1>
            </div>
            <div className="col-xs-12 col-sm-7">
              <ul className="pull-right">
                <li>
                  <Link
                    to='available'
                    className="btn btn-lg"
                    style={{
                      backgroundColor: '#333'
                    }}
                  >
                    AVAILABLE
                  </Link>
                </li>
                <li>
                  <Link
                    to='calendar'
                    className="btn btn-lg"
                    style={{
                      backgroundColor: '#333'
                    }}
                  >
                    CALENDAR
                  </Link>
                </li>
                <li>
                  <a
                    href="/logout"
                    className="btn btn-lg"
                    style={{
                      backgroundColor: '#333'
                    }}
                  >
                    LOGOUT
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-4">
           <DevTools/ >
          </div>
          <div className="col-xs-8">
            <div id="workArea">
              <div id="workBox">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = connect(function(state) {
  return state;
})(Home);

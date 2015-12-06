var React = require('react');

// var alasql=require('alasql');

import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { connect } from 'react-redux';
var Link = require('react-router').Link;

var Home = React.createClass({
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 navigation">
            <div className="col-xs-5">
              <h1><a href="/">MATCHLY.IO</a></h1>
            </div>
            <div className="col-xs-7">
              <ul className="pull-right">
                <li><Link to='available'>AVAILABLE</Link></li>
                <li><Link to='calendar'>CALENDAR</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
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

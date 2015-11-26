var React = require('react');

// var alasql=require('alasql');

var Link = require('react-router').Link;

var Home = React.createClass({
  render: function() {
    return (<div>
            <h1 id='header'>MATCHLY</h1>
            <div id='workArea'>
              <div id='workBox'>
                <div id='nav'>
                  <div id='tabs'>
                    <ul>
                      <li><Link to='/match'>MATCH</Link></li>
                      <li><Link to='/available'>AVAILABLE</Link></li>
                      <li><Link to='/upload'>UPLOAD</Link></li>
                      <li><Link to='/calendar'>CALENDAR</Link></li>
                    </ul>
                  </div>
                </div>
                {this.props.children}
              </div>
            </div>
          </div>);
  }
});

module.exports = Home;

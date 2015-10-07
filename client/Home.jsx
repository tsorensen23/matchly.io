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
                    </ul>
                  </div>
                </div>
                {this.props.children}
              </div>
            </div>
          </div>);

    // console.log('previous headers',this.state.previousHeaders);
    var workArea = <div></div>;
    var workNumber = this.state.workNumber;
    if (workNumber === 0) {
      workArea = <Match />;
    } else if (workNumber === 1) {
      workArea = <Available />;
    } else if (workNumber === 2) {
      workArea = <Upload />;
    }
  }
});

module.exports = Home;

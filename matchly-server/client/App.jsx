var React = require('react');

var App = React.createClass({
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 navigation">
            <div className="col-xs-12 text-center">
              <h1><a href="/">MATCHLY.IO</a></h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 text-center">
            {this.props.children}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 text-center">
            Powered by the people at <a href="http://oddball.io/">Oddball.io</a>
            <br />
            Come check us out
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;

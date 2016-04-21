var React = require('react');

var App = React.createClass({
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
            {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = App;

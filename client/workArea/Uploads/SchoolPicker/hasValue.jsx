var React = require('react');

var HasValueWrapper = React.createClass({
  changeValue: function(e) {
    e.preventDefault();
    this.props.possibleHandler(this.props.name);
  },

  render: function() {
    return (
      <div>
        {this.props.name}: {this.props.school}
        <button onClick={this.changeValue} >Change Value</button>
      </div>
    );
  }
});

module.exports = HasValueWrapper;

var React = require('react');

var Day = React.createClass({
  handleClick:function() {
    this.props.setIndexNumber(this.props.index);
  },

  render:function() {
    return (
      <div onClick={this.handleClick}>
        {this.props.day}
      </div>
    );
  },
});

module.exports = Day;

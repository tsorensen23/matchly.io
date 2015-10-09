var React = require('react');

var HasValueWrapper = React.createClass({
  changeValue: function(e) {
    e.preventDefault();
    this.props.possibleHandler(this.props.name);
  },

  render: function() {
    return (
        <tr>
        <td>
          {this.props.name}
        </td>
        <td>
          {this.props.school}
        </td>
        <td>
        <button className="btn btn-default" onClick={this.changeValue} >Change Value</button>
        </td>
        </tr>
    );
  }
});

module.exports = HasValueWrapper;

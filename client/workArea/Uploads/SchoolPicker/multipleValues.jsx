var React = require('react');

var MultipleValueWrapper = React.createClass({
  logger: function(e) {
    var name = this.props.name;
    var school = e.target.value;
    this.props.possibleHandler(name, school);
  },

  render: function() {
    return (
      <div>
        <b>{this.props.name} : {this.props.person}</b>
        <select onChange={this.logger}>{[
          <option selected disabled hidden value='' >Select One</option>
        ].concat(this.props.schools.map(function(school) {
          return <option value={school}>{school}</option>;
        }))}</select>
      </div>
    );
  }
});

module.exports = MultipleValueWrapper;

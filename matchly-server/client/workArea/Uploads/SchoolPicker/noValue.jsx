var React = require('react');
var Typeahead = require('react-typeahead').Typeahead;

var TypeAheadWrapper = React.createClass({
  logger: function(string) {
    var name = this.props.name;
    var school = string;
    this.props.possibleHandler(name, school);
  },

  render: function() {
    return (
      <div>
        <b>{this.props.person} : {this.props.name}</b>
        <Typeahead
          options={this.props.schools}
          maxVisible={10}
          onOptionSelected={this.logger}
        />
      </div>
    );
  }
});

module.exports = TypeAheadWrapper;

var React = require('react');
var Typeahead = require('react-typeahead').Typeahead;

var TypeAheadWrapper = React.createClass({
  logger: function(string) {
    console.log(`the key is ${this.props.name}, amnd the user selected ${string}`);
    var name = this.props.name;
    var school = string;
    this.props.possibleHandler(name, school);
  },

  render: function() {
    return (
      <div>
        {this.props.name}
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

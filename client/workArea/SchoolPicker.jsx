var React = require('react');
var Typeahead = require('react-typeahead').Typeahead;
var SchoolPicker = React.createClass({
  getInitialState: function() {
  return {schools: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: '/schools',
      type: 'get',
      dataType: 'json',
      complete: function(jqXHR, textStatus) {
        // callback
      },

      success: function(data, textStatus, jqXHR) {
        var schools = data.result.map(function(school) {
          return school.schoolName;
        });

        this.setState({schools: schools});
      }.bind(this),
      error: function(jqXHR, textStatus, errorThrown) {
        // TODO sam implemen a real endpoint that saves and logs client side errors
        console.warn('There was an error', errorThrown);
      }
    });
  },

  render: function() {
    var output = [];
    for (var name in this.props.possible) {
      if (!this.props.possible[name]) {
        output.push(
            <TypeAheadWrapper schools={this.state.schools} name={name} key={name} />
            );
      }
      // if statement for when we get more than two results for a certain alias
    }

    return (
        <div>
          {output}
        </div>
        );

  }
});
var TypeAheadWrapper = React.createClass({
  logger: function(string) {
    console.log(`the key is ${this.props.name}, amnd the user selected ${string}`);
    $.ajax({
      url: 'schoolmatch',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ alias: this.props.name, school: string}),
      complete: function(jqXHR, textStatus) {
        // callback
      },
      success: function(data, textStatus, jqXHR) {
        this.props.possibleHandler(data.value, data.schoolname);

        // success callback
      }.bind(this),

      error: function(jqXHR, textStatus, errorThrown) {
        // error callback
      }
    });
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
})

module.exports = SchoolPicker;

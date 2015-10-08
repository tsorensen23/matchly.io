var React = require('react');
var Typeahead = require('react-typeahead').Typeahead;

var NoValuePicker = require('./noValue.jsx');
var MultipleValuePicker = require('./multipleValues.jsx');

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
        this.setState({schools: data});
      }.bind(this),
      error: function(jqXHR, textStatus, errorThrown) {
        // TODO sam implemen a real endpoint that saves and logs client side errors
        console.warn('There was an error', errorThrown);
      }
    });
  },

  render: function() {
    var output = [];
    var possible = this.props.possible;
    var individuals = this.props.individuals;

    var possHandler = this.props.possibleHandler;
    var schools = this.state.schools;

    return (<div>{
      Object.keys(possible).filter(function(name) {
        if (!possible[name]) return true;
        if (!Array.isArray(possible[name])) return true;
        return false;
      }).map(function(name) {
        if (!possible[name]) {
          return <NoValuePicker
                  possibleHandler={possHandler}
                  schools={schools}
                  person={individuals[name]}
                  name={name} key={name}
                />;
        }

        if (Array.isArray(possible[name])) {
          return <MultipleValuePicker
            possibleHandler={possHandler}
            schools={possible[name]}
            person={individuals[name]}
            name={name} key={name}
          />;
        }
      })
    }</div>);

  }
});

module.exports = SchoolPicker;

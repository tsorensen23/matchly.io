var React = require('react');
var Typeahead = require('react-typeahead').Typeahead;
var SwitchComponent;
var TypeAheadWrapper = React.createClass({
  logger: function(string) {
    this.props.possibleHandler(this.props.name, string);
  },

  render: function() {
    return (
      <div>
        <b>{this.props.person} : {this.props.name}</b>
        <Typeahead
          ref='typeahead'
          customListComponent={Custom}
          options={this.props.schools}
          maxVisible={10}
          onOptionSelected={this.logger}
        />
      </div>
    );
  }
});

module.exports = TypeAheadWrapper;

var Custom = React.createClass({
  optionSelectedHandler: function(e) {
    var option = e.target.innerHTML;
    this.props.onOptionSelected(option)
  },
  render: function() {
    var output = this.props.options.map(function(option) {
      return <li onClick={this.optionSelectedHandler}>{option}</li>;
    }.bind(this));
    return(
        <ul>
          {output}
          <SwitchComponent testprop="hi" onOptionSelected={this.props.onOptionSelected} />
        </ul>);
  }
});

SwitchComponent = React.createClass({
  getInitialState: function() {
    return{clicked: false};
  },
  switcher: function() {
    this.setState({clicked: true});
  },
  addItem: function(e) {
    var newEmployer = React.findDOMNode(this.refs.newName).value;
    $.ajax({
      url: 'employers',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({name: newEmployer}),
      complete: function (jqXHR, textStatus) {
        // callback
      },
      success: function (data, textStatus, jqXHR) {
        // success callback
      },
      error: function (jqXHR, textStatus, errorThrown) {
        // error callback
      }
    });
    this.props.onOptionSelected(newEmployer);
  },
  render: function() {
    if(!this.state.clicked) {
      return <li onClick={this.switcher}>Add a new employer</li>;
    }
    return( 
      <form onSubmit={this.addItem}>
        <input ref='newName' type="text" />
      </form>
      );
  }

})

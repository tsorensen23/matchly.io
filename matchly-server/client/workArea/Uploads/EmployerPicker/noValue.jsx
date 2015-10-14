var React = require('react');
var Typeahead = require('react-typeahead').Typeahead;
var Event = require('events');
class TypeAheadEE extends Event.EventEmitter{
  constructor() {
    super();
  }
  update(string) {
    this.store = string;
  }
  get() {
    return this.store;
  }
}

var store = new TypeAheadEE();
var SwitchComponent;
var TypeAheadWrapper = React.createClass({
  getInitialState: function() {
    return {typed: void 0};
  },
  changeHandler: function(e) {
    // var typed = React.findDOMNode(this.refs.typeahead).childNodes[0].value;
    var typed = e.target.value;
    store.update(typed);
  },
  logger: function(string) {
    this.props.possibleHandler(this.props.name, string);
  },

  render: function() {
    return (
      <div>
        <b>{this.props.person} : {this.props.name}</b>
        <Typeahead
          ref='typeahead'
          onKeyUp={this.changeHandler}
          customListComponent={Custom}
          options={this.props.schools}
          maxVisible={10}
          onOptionSelected={this.logger}
        />
      </div>
    );
  }
});


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
          <SwitchComponent  onOptionSelected={this.props.onOptionSelected} />
        </ul>);
  }
});

var SwitchComponent = React.createClass({
  componentWillMount: function() {
    store.on('clicked', function() {
      var type = store.get();
      this.setState({default: type});
    }.bind(this));
  },

  getInitialState: function() {
    return {clicked: false, type: void 0};
  },

  switcher: function() {
    store.emit('clicked');
    this.setState({clicked: true});
  },

  addItem: function(e) {
    e.preventDefault();
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
  handler: function () {
    this.setState({default: React.findDOMNode(this.refs.newName).value});
  },
  render: function() {
    if(!this.state.clicked) {
      return <li onClick={this.switcher}>Add a new employer</li>;
    }
    return( 
      <form onSubmit={this.addItem}>
        <input value={this.state.default} onChange={this.handler} ref='newName' type="text" />
      </form>
      );
  }

});
module.exports = TypeAheadWrapper;

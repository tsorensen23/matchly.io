var React = require('react');
var Button = require('./Button.jsx');

var ButtonList = React.createClass({
  getInitialState: function() {
    var colors = [
      '#389adc',
      '#e74c3c',
      '#f1c40f',
      '#1abc9c',
      '#9b59b6',
      '#34495e',
      '#d35400',
      '#f39c12',
      '#16a085',
      'dodgerblue',
      'peachpuff',
      'teal'
    ];

    return ({
      requiredValue: null,
      categoriesDisabled: true,
      matchedFieldsDisabled: false,
      fieldsDisabled: true,
      colors: colors
    });
  },

  headersChanger: function(array) {
    array = array.map(function(obj) {
      return obj.value;
    });

    this.setState({headers:array});
    this.callDataParser(array);

  },

  callFieldsChange: function() {
    this.props.store.confirmHeaders()
  },

  //changeColor takes a componenets index
  changeColor: function(newValue) {
    if (this.state.requiredValue === null) {
      this.setState({requiredValue: newValue});
    } else {
      this.props.store.setHeader(this.state.requiredValue, newValue);
      this.setState({requiredValue:null});
    }

    this.setState({
      matchedFieldsDisabled: !this.state.matchedFieldsDisabled,
      fieldsDisabled: !this.state.fieldsDisabled
    });
  },

  render: function() {
    var matchedButtons = [];
    var categoryButtons = this.props.store.getRequired().map(function(name, index) {
      matchedButtons.push(
        <Button
          colorChange={this.changeColor}
          color={this.state.colors[index]}
          disabled={this.state.matchedFieldsDisabled}
          key={index}
          index={index}
          data={name}
          display={this.props.store.matched[name]}
        />
      );
      return (
        <Button
          colorChange={this.changeColor}
          color={this.state.colors[index]}
          disabled={this.state.categoriesDisabled}
          key={index}
          index={index}
          data={name}
          display={name}
        />
      );
    }.bind(this));

    var fieldButtons = this.props.store.available.map(function(name, index) {
      return (
        <Button
          colorChange={this.changeColor}
          color={null}
          disabled={this.state.fieldsDisabled}
          key={index}
          index={index}
          data={name}
          display={name}
        />
      );
    }.bind(this));

    return (
      <div>
        <div className='row'>
          <div className='col-xs-3 col-xs-offset-2'>
            <h1>Categories we need</h1>
          </div>
          <div className='col-xs-3 col-xs-offset-1'>
            <h1>Headers we received</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-2 col-xs-offset-2'>
            {categoryButtons}
          </div>
          <div className='col-xs-2 col-xs-offset-2'>
            {matchedButtons}
          </div>
          <div className='col-xs-2 col-xs-offset-1'>
            {fieldButtons}
          </div>
        </div>
        <div className="row">
          <div className='col-xs-12'>
            <input id='confirm-button' className="center" type='button' value='Field Change' onClick={this.callFieldsChange}></input>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ButtonList;
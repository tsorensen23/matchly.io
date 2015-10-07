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
      fieldsDisabled: true
    });
  },

  headersChanger: function(array) {
    array = array.map(function(obj) {
      return obj.value;
    });

    console.log('headersChanger', array);
    this.setState({headers:array});
    this.callDataParser(array);

  },

  callFieldsChange: function() {
    console.log('matchedFields in button list', this.state.matchedFields);
    this.props.fieldsChanger(this.state.matchedFields);
    this.props.headersChanger(this.state.matchedFields);
    this.props.togglePageView();
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
    console.log('matchedFields', this.state.matchedFields);

    var matchedButtons = [];
    var categoryButtons = this.props.store.required.map(function(name, index) {

      matchedButtons.push(
        <Button
          colorChange={this.changeColor}
          color={this.state.colors[index]}
          disabled={this.state.matchedFieldsDisabled}
          key={index}
          index={index}
          data={this.props.store.matched[name]}
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
        />
      );
    }.bind(this));

    return (
      <div>
        <div className='row'>
          <div className='col-md-2 col-md-offset-2'>
            <h1>Categories we need</h1>
          </div>
          <div className='col-md-2 col-md-offset-1'>
            <h1>Headers we got</h1>
          </div>
          <div className='col-md-2'>
            <input id='confirm-button' type='button' value='Field Change' onClick={this.callFieldsChange}></input>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-2 col-md-offset-2'>
            {categoryButtons}
          </div>
          <div className='col-md-2 col-md-offset-2'>
            {matchedButtons}
          </div>
          <div className='col-md-2 col-md-offset-1'>
            {fieldButtons}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ButtonList;
